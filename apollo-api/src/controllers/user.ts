import { type Request, type Response } from 'express'
// @ts-ignore
import bcrypt from 'bcrypt'
//@ts-ignore
import jwt from 'jsonwebtoken'

import { prisma } from '~/lib/prisma'
import { decodeToken } from '~/utils/decodeToken'
import { getUserWithEmail } from '~/utils/getUserWithEmail'
import { getTokenWithUserID } from '~/utils/getTokenWithUserId'
import { getUserWithUsername } from '~/utils/getUserWithUsername'
import { getUserWithId } from '~/utils/getUserWithId'

export const getUsers = async (req: Request, res: Response) => {
  console.log('Get users hit')
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        role: 'PADEKLARUAR',
      },
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      address: true,
      phone: true,
      orari: true,
      salary: true,
      userInfo: true,
      permissions: true,
      notifications: true,
    },
  })

  return res.status(200).json(users)
}
export const getUsersPadeklaruar = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {
      role: 'PADEKLARUAR',
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      address: true,
      phone: true,
      orari: true,
      salary: true,
      userInfo: true,
      permissions: true,
      notifications: true,
    },
  })

  return res.status(200).json(users)
}

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params
  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }
  const startTime = Date.now()
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      address: true,
      phone: true,
      orari: true,
      salary: true,
      userInfo: true,
      permissions: true,
      notifications: true,
      shpenzimet: {
        select: {
          id: true,
          kategoria: {
            select: {
              id: true,
              emri: true,
              pershkrimi: true,
            },
          },
          vlera: true,
          pershkrimi: true,
          data: true,
          imagePath: true,
        },
      },
      raportiShoferit: {
        select: {
          id: true,
          pranoi: true,
          dorzoi: true,
          paushall: true,
          minus: true,
          pershkrimi: true,
          vetura: {
            select: {
              id: true,
              name: true,
              kilometrazha: true,
            },
          },
          startTime: true,
          endTime: true,
          data: true,
        },
      },
    },
  })
  const endTime = Date.now()
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const totalTime = endTime - startTime
  const newUser = {
    totalTime,
    ...user,
  }
  return res.status(200).json(newUser)
}

//TODO: Refactor this function to reuse the duplicated code
export const login = async (req: Request, res: Response) => {
  console.log('Login hit')
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  try {
    const user = await getUserWithUsername(username)

    if (!user) {
      return res.status(404).json({
        message: 'User not found. Please check the username and try again',
      })
    }
    if (user.isActive === false) {
      return res.status(400).json({
        message: 'User is not active. Please contact the admin',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid Credentials, Please try again' })
    }

    const logedinUser = await getTokenWithUserID(user.id)

    if (logedinUser) {
      const decodedToken: any = decodeToken(logedinUser.token)

      if (
        decodedToken &&
        decodedToken.exp &&
        decodedToken.exp > Date.now() / 1000
      ) {
        // If token is still valid, return user is already logged in
        return res.status(401).json({ message: 'User is already logged in' })
      }
      console.log('Token expired')

      // Token has expired, generate a new token
      const newToken = jwt.sign(
        { name: user.name, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '5h' },
      )

      // Update the expired token in the database with the new token
      await prisma.token.update({
        where: { userId: user.id },
        data: {
          userId: user.id,
          token: newToken,
        },
      })

      return res.status(200).json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: newToken,
      })
    }

    // No token found, create a new one
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '5h' },
    )
    console.log('Token generated')
    console.log(new Date().toString())

    await prisma.token.create({
      data: { userId: user.id, token },
    })

    return res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    })
  } catch (error) {
    console.error('Error during login:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createUser = async (req: Request, res: Response) => {
  // Business logic
  try {
    const user = req.body
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    })

    if (existingUserByEmail || existingUserByUsername) {
      return res.status(400).json({
        message:
          'User with that email or username already exists. Try different ones.',
      })
    }
    console.log(user.permissions)
    const hashedPassword = await bcrypt.hash(user.password, 12)
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        address: user.address,
        phone: user.phone,
        orari: user.orari,
        salary: user.salary,
        userInfo: user.userInfo,
        permissions: user.permissions,
        notifications: user.notifications,
      },
    })

    console.log(createdUser)
    return res.status(201).end()
  } catch (error) {
    console.log('Error adding new user', error)
  }
}



export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)

  const userWithId = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  if (!userWithId) {
    return res.status(404).json({ message: 'User not found' })
  }
  const userToken = await getTokenWithUserID(userWithId.id)
  if (userToken) {
    await prisma.token.delete({
      where: { id: userToken.id },
    })
  }
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  })
  await prisma.activity.create({
    data: {
      userId: user.id,
      veprimi: 'DELETE',
      dokumenti: 'user',
    },
  })
  return res.status(200).json({ message: 'User successfully deleted' })
}

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided or invalid token',
    })
  }
  const decoded = decodeToken(token as string)
  const email = decoded?.email
  const user = await getUserWithEmail(email)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const dbToken = await getTokenWithUserID(user.id)
  if (!dbToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  await prisma.token.delete({
    where: {
      userId: user.id,
    },
  })
  return res.status(200).json({ message: 'Logged out' })
}
