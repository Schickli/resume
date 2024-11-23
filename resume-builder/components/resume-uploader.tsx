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
    "basics": {
      "name": "Maurin Schickli",
      "label": "Software Engineer Apprentice - Vice world champion in Industry 4.0",
      "image": "https://utfs.io/f/YYyCPs0ONMJCzCDvfpMC3RVpBz7sIkoL5NeTialcP8AHDFyg",
      "email": "maurin.schickli@gmail.com",
      "phone": "",
      "url": "schickli.com",
      "summary": "",
      "location": {
        "countryCode": "CH",
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
        "highlights": ["Help building a data platform for Buhler machines", "Working on Buhler's internal AI Chatbot Solution"],
        "url": "https://www.linkedin.com/company/buhler/",
        "location": "Uzwil, St Gallen, Switzerland"
      }
    ],
    "volunteer": [],
    "education": [
      {
        "institution": "GBS Gewerbliches Berufs- und Weiterbildungszentrum St. Gallen",
        "area": "St.Gallen",
        "studyType": "Berufsmaturität - Berufsbegleitend",
        "startDate": "August 2021",
        "endDate": "August 2025",
        "score": "",
        "courses": []
      }
    ],
    "awards": [
      {
        "title": "Worldskills Vice-Champion in Industry 4.0",
        "date": "September 2024",
        "awarder": "WorldSkills",
        "summary": "Competing with other young professionals on a global scale to create IoT solutions for industry."
      },
      {
        "title": "SwissSkills Champion Industry 4.0 🥇",
        "date": "September 2023",
        "awarder": "SwissSkills",
        "summary": ""
      }
    ],
    "certificates": [
      {
        "name": "First Certificate in English (FCE) - CEFR Level C1 ",
        "issuer": "Cambridge University Press & Assessment English",
        "startDate": "2024-07-31"
      }
    ],
    "publications": [],
    "skills": [
      {
        "name": "SQL",
        "level": "",
        "keywords": []
      },
      {
        "name": "OPC UA",
        "level": "",
        "keywords": []
      },
      {
        "name": "Angular",
        "level": "",
        "keywords": []
      },
      {
        "name": "TypeScript",
        "level": "",
        "keywords": []
      },
      {
        "name": "C#",
        "level": "",
        "keywords": []
      },
      {
        "name": "Industry 4.0",
        "level": "",
        "keywords": []
      }
    ],
    "languages": [
      {
        "fluency": "Native Speaker",
        "language": "German"
      },
      {
        "fluency": "Professional Working",
        "language": "English"
      }
    ],
    "interests": [],
    "references": [],
    "projects": [],
    "meta": {
      "version": "v1.0.0",
      "canonical": "https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json"
      }
}`;

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
