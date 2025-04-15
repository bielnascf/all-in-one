import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Index() {
  return (
    <main className="min-h-screen pt-44 px-4 flex flex-col items-center justify-start gap-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl leading-tight">
          Have <strong>feedback</strong> or an <strong>idea</strong>? <br />
          Let’s talk!
        </h1>
      </div>
      <form className="flex flex-col md:flex-row gap-6 w-full max-w-5xl" autoComplete="off">
        <Card className="border border-primary flex-1">
          <CardHeader className="text-bold text-2xl">
            <CardTitle className="text-primary">Ticket Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Ex: John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Ex: johndoe@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tell me who you are</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  avoidCollisions={false}
                  position="popper"
                  className="z-50"
                >
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="LinkedIn Visitor">
                    Just Browsing from LinkedIn
                  </SelectItem>
                  <SelectItem value="Recruiter">Tech Recruiter</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="User">Potential User</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-3xl flex justify-center items-center mt-5">
                <span className="text-primary">A</span>
                <span className="text-white">I</span>
                <span className="text-primary">O</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-primary flex-1">
          <CardHeader className="text-bold text-2xl">
            <CardTitle className="text-primary">Ticket Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="suggestion">Help us go from meh to wow</Label>
              <Textarea id="suggestion" rows={9} placeholder="Type here..."/>
            </div>
          </CardContent>
          <CardFooter>
            <Button
                type="submit"
                className="bg-primary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 md:px-3 md:py-2 sm:py-2 sm:px-2 rounded-xl text-center hover:opacity-80 ms-auto"
              >
                Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
