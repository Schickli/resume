"use client";

import { useCallback, useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type JSONData = Record<string, any>;

interface ResumeUploaderComponentProps {
  setJsonData: (data: JSONData | null) => void;
}

export const ResumeUploaderComponent = forwardRef<
  HTMLDivElement,
  ResumeUploaderComponentProps
>(({ setJsonData }, ref) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [exampleJson, setExampleJson] = useState<JSONData | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setJsonData(json);
      } catch (error) {
        toast.error("Please make sure your file is valid JSON", {
          description: `Error parsing JSON: ${error}`,
        });
        setJsonData(null);
      }
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
  });

  const exampleSchema = `{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "Maurin Schickli",
    "label": "Fullstack Developer - Vice World Champion in Industry 4.0",
    "image": "https://utfs.io/f/YYyCPs0ONMJCzCDvfpMC3RVpBz7sIkoL5NeTialcP8AHDFyg",
    "email": "hello@schickli.com",
    "url": "https://schickli.com",
    "summary": "Fullstack Developer skilled in creating useful features, optimizing workflows, and delivering innovative ideas. Dedicated to building solutions.",
    "location": {
      "address": "St.Gallen"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "maurin-schickli",
        "url": "https://www.linkedin.com/in/maurin-schickli/"
      }
    ]
  },
  "work": [
    {
      "name": "Bühler Group",
      "position": "Software Engineering Apprentice",
      "startDate": "August 2021",
      "endDate": "August 2025",
      "highlights": [
        "Developing our administration portal to improve Bühler Insights setup and management workflows.",
        "Outlined and improved our registration and update processes for our edge devices.",
        "Contributing to Bühler's internal AI Chatbot Solution.",
        "Helped in building Industry 4.0 expertise among the apprentices."
      ],
      "url": "https://www.linkedin.com/company/buhler/",
      "location": "Uzwil, St Gallen, Switzerland"
    }
  ],
  "education": [
    {
      "institution": "GBS Gewerbliches Berufs- und Weiterbildungszentrum St. Gallen",
      "studyType": "Berufsmaturität - Berufsbegleitend",
      "startDate": "August 2021",
      "endDate": "August 2025"
    }
  ],
  "awards": [
    {
      "title": "Vice-World-Champion in Industry 4.0",
      "date": "September 2024",
      "awarder": "WorldSkills",
      "summary": "Competed against top professionals worldwide together with my teampartner to create IoT-enabled smart systems with features like alerts, image recognition, and database integration."
    },
    {
      "title": "SwissSkills Winner in Industry 4.0",
      "date": "September 2023",
      "awarder": "SwissSkills",
      "summary": "National champion in developing innovative Industry 4.0 solutions, including smart sensors and IoT systems."
    }
  ],
  "skills": [
    {
      "name": "Angular, Next.Js"
    },
    {
      "name": "TypeScript"
    },
    {
      "name": "C#"
    },
    {
      "name": "Industry 4.0"
    },
    {
      "name": "IoT & Edge Devices"
    },
    {
      "name": "OPC UA"
    },
    {
      "name": "Smart Sensors"
    },
    {
      "name": "SQL"
    }
  ],
  "languages": [
    {
      "language": "German",
      "fluency": "Native Speaker"
    },
    {
      "language": "English",
      "fluency": "Professional Working"
    }
  ],
  "projects": [
    {
      "name": "DeepL UI",
      "description": "I was part of DeepL UI a project, executed entirely by apprentices, to implement a custom user interface for the DeepL API. This solution reduced costs by over 80%. The project taught us how to take software from concept to deployment, emphasizing teamwork, requirement management, and delivering a user-focused product.",
      "startDate": "October 2022",
      "endDate": "January 2023",
      "type": "Apprenticeship"
    },
    {
      "name": "Cocktail Mixer",
      "description": "A machine capable of creating customised cocktails based on user input via a tablet. Features included an ESP32 microcontroller, stepper motors and an MES-like application to manage bottles and orders. I faced some challenges in managing the different states of the machine. I overcame this by drawing out all the possible outcomes and thinking from an operator and customer point of view.",
      "startDate": "Febuary 2024",
      "type": "Hobby"
    },
    {
      "name": "Resume Generator",
      "description": "A tool for programmatically generating resumes from JSON, making it easier to create and update resumes. I created this because I struggled with updating my resume without destroying my formatting every time.",
      "url": "http://resume.schickli.com",
      "startDate": "November 2024",
      "endDate": "December 2024",
      "type": "Hobby"
    }
  ],
  "interests": [
    {
      "name": "Soccer"
    },
    {
      "name": "Kitesurfing"
    },
    {
      "name": "Skiing"
    }
  ],
  "meta": {
    "version": "v1.0.0",
    "canonical": "https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json"
  }
}
`;

  const handleUseExampleJson = useCallback(() => {
    try {
      const parsedExample = JSON.parse(exampleSchema);
      setJsonData(parsedExample);
      setExampleJson(parsedExample);
    } catch (error) {
      toast.error(`I'm sorry about that!`, {
        description: "Error parsing Example Resume.",
      });
    }
  }, [exampleSchema, setJsonData]);

  return (
    <div className="container mx-auto p-4" ref={ref}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>
            Upload a JSON file following the{" "}
            <a
              href="https://jsonresume.org/schema/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              JSON Resume schema.
            </a>{" "}
            Everything stays in your browser!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the JSON file here...</p>
            ) : exampleJson ? (
              <p>
                Example JSON Resume is loaded. You can drag a new file to
                replace it.
              </p>
            ) : (
              <p>
                Drag and drop a JSON Resume file here, or click to select a file
              </p>
            )}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>
              Make sure your JSON file follows the correct schema. Need help?
              Check out the example below.
            </p>
          </div>
          <div className="gap-2 flex flex-wrap">
            <div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">View Example Schema</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Example JSON Resume Schema</DialogTitle>
                  </DialogHeader>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                    <code>{exampleSchema}</code>
                  </pre>
                </DialogContent>
              </Dialog>
            </div>
            <Button variant="secondary" onClick={handleUseExampleJson}>
              Use Example Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
