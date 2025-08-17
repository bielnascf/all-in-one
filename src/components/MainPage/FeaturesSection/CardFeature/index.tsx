import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export type CardFeatureProps = {
 title: string;
 icon: React.FC<React.SVGProps<SVGSVGElement>>;
 description: string;
 className?: string;
 stroke?: string;
 fill?: string;
}

export default function CardFeature({
 icon: Icon,
 title,
 description,
 className,
 stroke,
 fill
}: CardFeatureProps) {
 return (
   <Card className={`border border-primary ${className}`}>
     <CardHeader className="text-center text-bold text-xl">
       <CardTitle>{title}</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="flex justify-center items-center">
        <Icon width={80} height={80} stroke={stroke} fill={fill}/>
      </div>
     </CardContent>
     <CardFooter className="text-pretty text-zinc-200">
       <p className="text-center w-full">{description}</p>
     </CardFooter>
   </Card>
 )
};
