import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useGSAPReveal(0.1) as React.RefObject<HTMLElement>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_zo3e1mr',
        'template_ki8nbwt',
        { from_name: data.name, from_email: data.email, message: data.message },
        'Scx0rC0RbiIBtDwxw'
      );
      toast({ title: "Message sent.", description: "I'll get back to you soon." });
      form.reset();
    } catch {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper ref={sectionRef} id="contact">
      {/* Bold closing statement */}
      <div className="gsap-reveal mb-16">
        <h2 className="font-display text-display text-foreground leading-none tracking-tight">
          Let's<br />Talk.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Links */}
        <div className="gsap-reveal space-y-6">
          <div className="border-t border-border pt-6">
            <span className="caption text-muted-foreground block mb-2">Email</span>
            <a href="mailto:ngoli@umich.edu" className="font-sans text-foreground link-underline">
              ngoli@umich.edu
            </a>
          </div>
          <div className="border-t border-border pt-6">
            <span className="caption text-muted-foreground block mb-2">GitHub</span>
            <a href="https://github.com/NikhilGoli45" target="_blank" rel="noopener noreferrer" className="font-sans text-foreground link-underline">
              github.com/NikhilGoli45
            </a>
          </div>
          <div className="border-t border-border pt-6">
            <span className="caption text-muted-foreground block mb-2">LinkedIn</span>
            <a href="https://linkedin.com/in/nikhilgoli" target="_blank" rel="noopener noreferrer" className="font-sans text-foreground link-underline">
              linkedin.com/in/nikhilgoli
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="gsap-reveal">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                      />
                    </FormControl>
                    <FormMessage className="caption" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                      />
                    </FormControl>
                    <FormMessage className="caption" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        rows={4}
                        {...field}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                      />
                    </FormControl>
                    <FormMessage className="caption" />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="caption text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
