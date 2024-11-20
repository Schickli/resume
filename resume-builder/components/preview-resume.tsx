import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, Calendar } from "lucide-react";
import { forwardRef } from "react";

type JSONData = Record<string, any>;

interface PreviewResumeComponentProps {
  json?: JSONData | null;
  ref: HTMLDivElement | null;
}

export const PreviewResume = forwardRef<
  HTMLDivElement,
  PreviewResumeComponentProps
>(({ json }, ref) => {
  if (!json) {
    return <div className="text-center p-4">No resume data available</div>;
  }

  const { basics, work, education, skills, languages, projects } = json;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white" ref={ref}>
      {/* Header / Basic Info */}
      <header className="mb-8 flex items-center">
        <Avatar className="w-32 h-32 mb-4">
          <AvatarImage src={basics?.image} alt={basics?.name} />
          <AvatarFallback>{basics?.name?.charAt(0) || "J"}</AvatarFallback>
        </Avatar>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">
            {basics?.name || "Name Not Provided"}
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {basics?.label || "Role Not Specified"}
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            {basics?.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {`${basics.location.city}, ${basics.location.region}`}
              </span>
            )}
            {basics?.email && (
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {basics.email}
              </span>
            )}
            {basics?.phone && (
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {basics.phone}
              </span>
            )}
            {basics?.url && (
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                <a
                  href={basics.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Website
                </a>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {basics?.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <p>{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
          {work.map((job: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle>
                  {job.position} at {job.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {job.startDate} - {job.endDate || "Present"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{job.summary}</p>
                {job.highlights && (
                  <ul className="list-disc list-inside">
                    {job.highlights.map((highlight: string, i: number) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          {education.map((edu: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle>
                  {edu.studyType} in {edu.area}
                </CardTitle>
                <p className="text-muted-foreground">{edu.institution}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>
                {edu.courses && (
                  <div>
                    <p className="font-semibold mb-1">Courses:</p>
                    <ul className="list-disc list-inside">
                      {edu.courses.map((course: string, i: number) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: any, index: number) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Languages</h2>
          <ul className="list-disc list-inside">
            {languages.map((lang: any, index: number) => (
              <li key={index}>
                {lang.language} - {lang.fluency}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          {projects.map((project: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle>{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {project.startDate} - {project.endDate || "Present"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{project.description}</p>
                {project.highlights && (
                  <ul className="list-disc list-inside">
                    {project.highlights.map((highlight: string, i: number) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Project Link
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
});
