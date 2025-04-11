import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const ProjectsSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const readyProjectIds = [
    // "WagerWars" Uncomment to make ready
  ];

  const isProjectReady = (projectId: string) => {
    return readyProjectIds.includes(projectId);
  };
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
        </div>

        <div className="max-w-6xl mx-auto relative overflow-visible">
          {isMounted && (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[80%] sm:basis-[60%] md:basis-[50%] lg:basis-[40%] px-4"
                  >
                    <Card className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                          {project.description}
                        </p>

                        <div className="space-y-4 mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3 justify-between items-center">
                            {project.demoLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex gap-2 items-center"
                                asChild
                              >
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Live Demo</span>
                                </a>
                              </Button>
                            )}

                            {project.repoLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex gap-2 items-center"
                                asChild
                              >
                                <a
                                  href={project.repoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>Source Code</span>
                                </a>
                              </Button>
                            )}

                            <Button
                              size="sm"
                              className="flex gap-2 items-center ml-auto"
                              asChild
                            >
                              <Link to={isProjectReady(project.id) ? `/project/${project.id}` : "/project/not-ready"}>
                                <span>Details</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Navigation Arrows */}
              <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-20" />
              <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-20" />
            </Carousel>
          )}

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/30"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
