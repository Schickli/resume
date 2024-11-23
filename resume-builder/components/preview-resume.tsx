import { forwardRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type JSONData = Record<string, any>;

interface PreviewResumeComponentProps {
  json?: JSONData | null;
}

export const PreviewResume = forwardRef<
  HTMLDivElement,
  PreviewResumeComponentProps
>(({ json }, ref) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  if (!json || !json.basics) {
    return <div className="text-center p-4">No resume data available</div>;
  }

  const { basics, work, education, skills, languages, projects } = json;

  useEffect(() => {
    if (imagesLoaded) {
      toast.success("Resume finished generating!");
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (basics.image === "") {
      setImagesLoaded(true);
    }
  }, [basics]);

  const handleAvatarLoad = () => {
    if (basics.image != "") {
      setImagesLoaded(true);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8">
      <div
        className="w-[21cm] min-h-[29.7cm] bg-white shadow-md mx-auto my-8 p-[1cm] font-sans"
        style={{
          boxSizing: "border-box",
        }}
      >
        <div ref={ref} className="print:p-[1cm]">
          {/* Header / Basic Info */}
          <header className="mb-6 border-b pb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                {/* Avatar with conditional spinner */}
                <Avatar className="w-24 h-24">
                  {imagesLoaded == false && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <AvatarImage
                    src={basics?.image}
                    alt={basics?.name}
                    onLoad={handleAvatarLoad}
                  />
                  <AvatarFallback>
                    {basics?.name?.charAt(0) || "MS"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {basics?.name || "Name Not Provided"}
                </h1>
                <p className="text-xl text-gray-600">
                  {basics?.label || "Role Not Specified"}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  {basics?.email && (
                    <span className="mr-4">{basics.email}</span>
                  )}
                  {basics?.phone && (
                    <span className="mr-4">{basics.phone}</span>
                  )}
                  {basics?.url && <span>{basics.url}</span>}
                </div>
              </div>
            </div>
          </header>

          {/* Summary */}
          {basics?.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-sm">{basics.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              {work.map((job: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    {job.position} at {job.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate || "Present"}
                  </p>
                  <p className="text-sm mt-1">{job.summary}</p>
                  {job.highlights && (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {job.highlights.map((highlight: string, i: number) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {education.map((edu: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    {edu.studyType} in {edu.area}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Languages</h2>
              <ul className="list-disc list-inside text-sm">
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
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {projects.map((project: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate || "Present"}
                  </p>
                  <p className="text-sm mt-1">{project.description}</p>
                  {project.highlights && (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {project.highlights.map(
                        (highlight: string, i: number) => (
                          <li key={i}>{highlight}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
});
