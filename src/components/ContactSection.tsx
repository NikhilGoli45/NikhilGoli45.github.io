import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const links = [
  { label: "Email", href: "mailto:ngoli@umich.edu", text: "ngoli@umich.edu" },
  { label: "GitHub", href: "https://github.com/NikhilGoli45", text: "github.com/NikhilGoli45", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/nikhilgoli", text: "linkedin.com/in/nikhilgoli", external: true },
];

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
    <SectionWrapper ref={sectionRef} id="contact" className="py-8 md:py-12 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 lg:items-center">
        <div className="gsap-reveal">
          <h2 className="font-display text-h2 md:text-h1 text-foreground leading-none tracking-tight mb-5 md:mb-8 lg:mb-10">
            Let's Talk.
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-y-0 lg:divide-y lg:divide-border">
            {links.map((link) => (
              <div key={link.label} className="lg:py-3 lg:first:pt-0 lg:last:pb-0">
                <span className="caption text-muted-foreground block mb-1">{link.label}</span>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-sans text-sm text-foreground link-underline"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="gsap-reveal lg:self-center">
          <div className="border border-border rounded-lg p-3 md:p-5 bg-muted/20">
            <h3 className="caption text-muted-foreground mb-4">Send a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans text-sm">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel className="font-sans text-sm">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage className="caption" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-sm">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What's on your mind?"
                          rows={2}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="caption" />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="caption text-foreground border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
