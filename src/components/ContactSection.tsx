import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const serviceId = 'service_zo3e1mr';
      const templateId = 'template_ki8nbwt';
      const userId = 'Scx0rC0RbiIBtDwxw';
      
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message
      };
      
      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:your.email@example.com" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                        ngoli@umich.edu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ann Arbor, MI
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a href="tel:+11234567890" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                        +1 (248) 787-9046
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/NikhilGoli45" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com/in/nikhilgoli" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  {/* Will add Twitter when I get an account */}
                  {/* <Button variant="outline" size="icon" asChild>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
