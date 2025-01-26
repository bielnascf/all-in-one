import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export type CardFeatureProps = {
 title: string;
 icon: React.FC<React.SVGProps<SVGSVGElement>>;
 description: string;
}

export default function CardFeature({
 icon: Icon,
 title,
 description,
}: CardFeatureProps) {
 return (
   <Card className="border border-primary">
     <CardHeader className="text-center text-bold text-xl">
       <CardTitle>{title}</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="flex justify-center items-center">
        <Icon width={80} height={80}/>
      </div>
     </CardContent>
     <CardFooter className="text-pretty text-zinc-200">
       <p className="text-center">{description}</p>
     </CardFooter>
   </Card>
 )
};
