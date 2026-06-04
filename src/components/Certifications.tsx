import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/contexts/CMSContext";

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useCMS();
  const certifications = data.certifications;

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 px-6 relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional achievements and continuous learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full glass-effect group hover:-translate-y-2 transition-transform duration-300">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">{cert.badge || "🏆"}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-muted-foreground mb-4 font-medium flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> {cert.issuer}
                  </div>
                  
                  {cert.date && (
                    <div className="text-sm text-muted-foreground/60 mb-6">
                      {new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </div>
                  )}

                  <div className="mt-auto">
                    {cert.credentialUrl && cert.credentialUrl !== "#" && (
                      <Button asChild variant="outline" className="w-full gap-2 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30">
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" /> View Credential
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
