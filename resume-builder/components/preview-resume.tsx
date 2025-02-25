import { forwardRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const translations = {
  en: {
    work: "Work Experience",
    projects: "Projects",
    education: "Education",
    skills: "Skills",
    awards: "Awards",
    interests: "Interests",
  },
  de: {
    work: "Berufserfahrung",
    projects: "Projekte",
    education: "Ausbildung",
    skills: "Fähigkeiten",
    awards: "Auszeichnungen",
    interests: "Interessen",
  },
};

type JSONData = Record<string, any>;

interface PreviewResumeComponentProps {
  language: "en" | "de";
  json?: JSONData | null;
}

export const PreviewResume = forwardRef<
  HTMLDivElement,
  PreviewResumeComponentProps
>(({ json, language }, ref) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  if (!json || !json.basics) {
    return <div className="text-center p-4">No resume data available</div>;
  }

  const {
    basics,
    work,
    education,
    skills,
    languages,
    projects,
    awards,
    interests,
  } = json;

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
    <div className="flex justify-center items-start min-h-screen p-1 sm:p-8">
      <div
        className="w-[21cm] min-h-[29.7cm] bg-white shadow-md mx-auto my-8 p-[1cm] font-sans mt-48 sm:mt-32 lg:mt-0"
        style={{ boxSizing: "border-box" }}
      >
        <div ref={ref}>
          <header className="mb-3 border-b pb-3 break-inside-avoid">
            <div className="block sm:flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Avatar className="w-24 h-24">
                  {!imagesLoaded && (
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
              </div>
            </div>
          </header>

          {work && work.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].work}
              </h2>
              {work.map((job: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-1">
                      <h3 className="font-semibold">{job.name}</h3>
                      <p>-</p>
                      <p>{job.position}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {job.startDate} - {job.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    {job.description}
                  </p>
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

          {projects && projects.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].projects}
              </h2>
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
                  <p className="text-sm mt-1 text-gray-600">{project.url}</p>
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

          {skills && skills.length > 0 && (
            <section className="mb-3  break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].skills}
              </h2>
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
          {education && education.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].education}
              </h2>
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

          {/* Awards */}
          {awards && awards.length > 0 && (
            <section className="mb-3 break-inside-avoid">
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].awards}
              </h2>
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
              <h2 className="text-xl font-semibold mb-2">
                {translations[language].interests}
              </h2>
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
