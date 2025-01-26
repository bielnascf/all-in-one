import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardFeatureProps } from "../../FeaturesSection/CardFeature";

export default function CardAbout({
  icon: Icon,
  title,
  description,
}: CardFeatureProps) {
  return (
    <Card className="border border-primary md:grid md:grid-cols-2 sm:gap-4 md:px-4 md:py-6 px-2 flex flex-col">
      <div className="flex justify-center items-center md:p-0 md:py-4 p-6">
        <Icon />
      </div>
      <div>
        <CardHeader className="text-center text-bold text-2xl">
          <CardTitle className="text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-justify sm:text-sm xl:text-base text-xs sm:text-center text-zinc-200">{description}</p>
        </CardContent>
      </div>
    </Card>
  );
}
