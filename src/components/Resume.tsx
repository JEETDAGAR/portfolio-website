import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Eye, Star, Award } from 'lucide-react';

interface ResumeProps {
  data: any; // Portfolio data for generating resume content
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const generateResume = () => {
    // Create resume content with updated data
    const resumeContent = `
JEET DAGAR
DevOps Engineer & AWS Solution Architect

Contact Information:
Email: ${data.personal_info.email}
Phone: ${data.personal_info.phone}
Location: ${data.personal_info.location}
LinkedIn: ${data.personal_info.linkedin}
GitHub: ${data.personal_info.github}

PROFESSIONAL SUMMARY
${data.personal_info.professional_summary}

WORK EXPERIENCE

Amazon Web Services (AWS) - Solutions Architect
2024 - Present | Remote
${data.work_experience[0].description}

Key Responsibilities:
${data.work_experience[0].responsibilities.map((resp: string) => `• ${resp}`).join('\n')}

Key Achievements:
${data.work_experience[0].achievements.map((ach: string) => `• ${ach}`).join('\n')}

Q3 Technologies - DevOps Engineer
July 2023 - Present | Gurugram
${data.work_experience[1].description}

Notable Projects:
${data.work_experience[1].projects.map((project: any) => `
• ${project.name}: ${project.description}
  Technologies: ${project.technologies.join(', ')}
  Achievements: ${project.achievements.join(', ')}
`).join('\n')}

TECHNICAL SKILLS
${Object.entries(data.technical_skills).map(([category, skills]: [string, any]) => 
  `${category}: ${Object.values(skills).flat().join(', ')}`
).join('\n')}

CERTIFICATIONS
${data.certifications.map((cert: any) => `• ${cert.name} - ${cert.issuer}`).join('\n')}

EDUCATION
${data.education.map((edu: any) => 
  `${edu.degree} in ${edu.field}\n${edu.institution} | ${edu.duration} | ${edu.achievement}`
).join('\n\n')}

PERSONAL PROJECTS
${data.personal_projects.map((project: any) => `
${project.name}
${project.description}
Technologies: ${project.technologies.join(', ')}
Key Features: ${project.key_features.join(', ')}
`).join('\n')}

LEADERSHIP EXPERIENCE
${data.leadership_experience.map((lead: any) => `
${lead.role} - ${lead.organization}
${lead.duration}
${lead.description}
`).join('\n')}
    `.trim();

    return resumeContent;
  };

  const downloadResume = () => {
    const resumeContent = generateResume();
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Jeet_Dagar_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const previewResume = () => {
    const resumeContent = generateResume();
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Jeet Dagar - Resume</title>
            <style>
              body {
                font-family: 'Courier New', monospace;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              h1 { color: #2563eb; border-bottom: 2px solid #2563eb; }
              h2 { color: #7c3aed; margin-top: 30px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${resumeContent}</pre>
          </body>
        </html>
      `);
    }
  };

  const highlights = [
    {
      icon: Award,
      title: "4 AWS Certifications",
      description: "Cloud Practitioner, Solutions Architect, Developer, SysOps Admin",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      title: "2+ Years Experience",
      description: "DevOps Engineer & AWS Solutions Architect",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: FileText,
      title: "Enterprise Projects",
      description: "Handling 30k-40k daily users with optimal performance",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-purple-900/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Download Resume
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-4">
            Get my complete professional profile in a convenient format
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Professional Highlights
            </h3>
            
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group flex items-center space-x-4 p-6 bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-white/70">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Download Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Main download card */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Complete Resume
              </h3>
              
              <p className="text-white/80 mb-8">
                Download my comprehensive resume with updated experience timeline, 
                AWS certifications, and latest project details.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={downloadResume}
                  className="group flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} className="mr-2 group-hover:animate-bounce" />
                  Download Resume
                </motion.button>

                <motion.button
                  onClick={previewResume}
                  className="group flex items-center justify-center px-8 py-3 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} className="mr-2" />
                  Preview Resume
                </motion.button>
              </div>
            </div>

            {/* Updated info callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20"
            >
              <div className="flex items-center mb-3">
                <Star size={20} className="text-green-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Recently Updated</h4>
              </div>
              <p className="text-white/80 text-sm">
                Resume includes corrected AWS experience timeline (2024 - Present) 
                and highlights 4 AWS certifications achievement.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
