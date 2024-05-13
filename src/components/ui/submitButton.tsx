import { Button } from "./button";

export const SubmitButton = ({ loading, text, ...props }: { loading?: boolean, text?: string }) => {
   return (
      <Button variant="default" type="submit" {...props}disabled={loading}>
         {loading ? "Loading..." : text || "Submit"}
      </Button>
   );
};
