
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-5/12">
            <div className="relative">
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                {/* Replace with your image */}
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <img src="Headshot.jpg"></img>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                <Badge className="text-lg font-medium px-3 py-1">
                  Available for work
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            I'm a Computer Science and Math of Finance student at the University of Michigan 
            with a passion for building high-performance, reliable systems. I've developed 
            everything from real-time trading platforms and OS kernels to full-stack web apps 
            and machine learning models. I enjoy solving complex problems, moving quickly, and 
            continuously learning.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              When I'm not coding, you can find me playing soccer, listening to music, or going to car meets!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-gray-600 dark:text-gray-300">Bachelor's in Computer Science and Mathematics</p>
                  <p className="text-sm text-gray-500">University of Michigan, 2022-2026</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">Novi, MI</p>
                  <p className="text-sm text-gray-500">Open to remote opportunities and willing to relocate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
