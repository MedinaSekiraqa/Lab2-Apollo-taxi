export type User = {
   id?: string;
   name: string;
   lastName: string;
   phone: string;
   address: string;
   username: string;
   email: string;
   password: string;
   userInfo?: string;
   salary: number;
   role: Role;
   orari: "PLOTE" | "GJYS";
   permissions?: ("FINANCE" | "ADDUSER" | "REPORTS" | "WORKERS")[];
   notifications?: ("SALARY" | "SCHEDULE" | "ROLE")[];
};
export enum Role {
   ADMIN = "ADMIN",
   PRIMAR = "PRIMAR",
   SEKONDAR = "SEKONDAR",
   PADEKLARUAR = "PADEKLARUAR",
}
export type KategoriaShpenzimeve = {
   id?: string | undefined;
   emri: string;
   pershkrimi?: string;
};
export type Shpenzimet = {
   id?: string;
   kategoriaId: string;
   kategoria: KategoriaShpenzimeve;
   vlera: number;
   pershkrimi?: string;
   data: Date;
   userId: string;
   imagePath?: string;
};

export type RaportiShoferit = {
   id?: string;
   pranoi: number;
   dorzoi: number;
   paushall: number;
   minus?: number;
   pershkrimi?: string;
   shpenzimetId?: string;
   veturaId: string;
   vetura: Vetura;
   userId: string;
   user: User;
   startTime: string;
   endTime: string;
   data: Date;
};

export type Vetura = {
   id?: string;
   name: string;
   kilometrazha?: string;
   user: User[];
   shpenzimet: Shpenzimet[];
   raportiShoferit: RaportiShoferit[];
};
