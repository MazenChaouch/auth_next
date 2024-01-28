import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWapperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWapper = ({
  children,
  headerlabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWapperProps) => {
  return (
    <Card className="w-full max-w-[500px] shadow-xl flex flex-col justify-center">
      <CardHeader>
        <Header label={headerlabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="justify-center">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
