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

  const { basics, work, education, skills, languages, projects, awards, interests } = json;

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
    <div className="flex justify-center items-start min-h-screen p-8">
      <div
        className="w-[21cm] min-h-[29.7cm] bg-white shadow-md mx-auto my-8 p-[1cm] font-sans"
        style={{
          boxSizing: "border-box",
        }}
      >
        <div ref={ref}>
          {/* Header / Basic Info */}
          <header className="mb-3 border-b pb-3 break-inside-avoid">
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
                  {basics?.url && <span className="mr-4">{basics.url}</span>}
                  {basics?.location?.address && (
                    <span className="mr-4">{basics.location.address}</span>
                  )}
                  {languages && languages.length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {languages.map((lang: any, index: number) => (
                        <li key={index}>
                          {lang.language} - {lang.fluency}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Summary */}
          {basics?.summary && (
            <section className="mb-3 break-inside-avoid">
              <p className="text-sm">{basics.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              {work.map((job: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <h3 className="font-semibold">
                      {job.position} at {job.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {job.startDate} - {job.endDate || "Present"}
                    </p>
                  </div>
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {projects.map((project: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <h3>-</h3>
                      <h3 className="">{project.type}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate || "Present"}
                    </p>
                  </div>
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

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {education.map((edu: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <h3 className="font-semibold">
                      {edu.studyType} {edu.area && <span>in {edu.area}</span>}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-3  break-inside-avoid">
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

          {/* Awards */}
          {awards && awards.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">Awards</h2>
              {awards.map((award: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <h3 className="font-semibold">{award.title}</h3>
                    <p className="text-sm text-gray-600">
                      {award.date} - {award.awarder}
                    </p>
                  </div>
                  <p className="text-sm mt-1">{award.summary}</p>
                </div>
              ))}
            </section>
          )}

          {/* Interests */}
          {interests && interests.length > 0 && (
            <section className="mb-3  break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interests: any, index: number) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                  >
                    {interests.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
});
