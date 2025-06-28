import React, { useEffect, useState } from 'react';
import { Loader2, Download, FileText, Copy } from 'lucide-react';
import useResumeData from '@/hooks/useResumeData';

const Resume: React.FC = () => {
  const { resumeData, loading, error } = useResumeData();
  const [markdownContent, setMarkdownContent] = useState<string>('');

  const generateMarkdownContent = (data: any) => {
    return `# ${data.personal_info.full_name}

**${data.personal_info.designation}**

---

**Contact Information:**
- Email: ${data.personal_info.email}
- Phone: ${data.personal_info.phone_num}
- Address: ${data.personal_info.address}
- Date of Birth: ${data.personal_info.dob}
- Experience: ${data.personal_info.total_years_of_experience} years

---

## PROFESSIONAL SUMMARY

${data.personal_info.resume_summary || data.personal_info.long_descriptive_summary}

---

## WORK EXPERIENCE

${data.work_experience.map((exp: any) => `
### ${exp.designation}
**${exp.company_name}** | ${exp.company_location}  
*${exp.start_date} - ${exp.end_date}*

`).join('')}

---

## EDUCATION

${data.education.map((edu: any) => `
### ${edu.degree}
**${edu.institution}** | ${edu.field_of_study}  
*${edu.start_date} - ${edu.end_date}*${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}

`).join('')}

---

## TECHNICAL SKILLS

${data.skills.map((skill: any) => `
- **${skill.name}**: ${'★'.repeat(skill.rating)}${'☆'.repeat(5 - skill.rating)} (${skill.rating}/5)`).join('')}

---

## KEY PROJECTS

${data.projects.slice(0, 6).map((project: any) => `
### ${project.title}
*${project.start_date} - ${project.end_date || 'Present'}*

- **Role**: ${project.role}${project.company ? ` at ${project.company}` : ''}
- **Type**: ${project.project_type} | **Status**: ${project.status}
- **Description**: ${project.long_description}
- **Tech Stack**: ${[
    ...(project.skills || []),
    project.hosting_platform,
    project.cicd_pipeline,
    project.monitoring_tracking
].filter(Boolean).join(', ')}

`).join('')}

${data.certifications.length > 0 ? `---

## CERTIFICATIONS

${data.certifications.map((cert: any) => `
- ${cert.name} - ${cert.issuing_organization} (${cert.issue_date})${cert.expiry_date ? ` - Expires: ${cert.expiry_date}` : ''}

`).join('')}` : ''}

---

*Generated on ${new Date().toLocaleDateString()}*
`;
  };

  useEffect(() => {
    if (resumeData) {
      const content = generateMarkdownContent(resumeData);
      setMarkdownContent(content);
    }
  }, [resumeData]);

  const handleDownloadMarkdown = () => {
    if (markdownContent && resumeData) {
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personal_info.full_name.replace(/\s+/g, '_')}_Resume.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCopyToClipboard = async () => {
    if (markdownContent) {
      try {
        await navigator.clipboard.writeText(markdownContent);
        alert('Resume copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy to clipboard');
      }
    }
  };

  const handlePrintAsPDF = () => {
    if (!resumeData) return;

    // Create a new window with PDF-optimized content
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow popups for PDF generation');
      return;
    }

    // Generate the HTML content optimized for PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData?.personal_info.full_name} - Resume</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            background: white;
        }
        
        .resume-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
        }
        
        .header h1 {
            font-size: 24pt;
            font-weight: bold;
            margin: 0 0 10px 0;
        }
        
        .header .designation {
            font-size: 14pt;
            margin: 0 0 15px 0;
            font-weight: 600;
        }
        
        .contact-info {
            font-size: 11pt;
            margin-bottom: 5px;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }
        
        .item {
            margin-bottom: 15px;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
        }
        
        .item-title {
            font-size: 12pt;
            font-weight: bold;
            margin: 0;
        }
        
        .item-subtitle {
            font-size: 11pt;
            margin: 2px 0;
            font-weight: 600;
        }
        
        .item-details {
            font-size: 10pt;
            margin: 2px 0;
            color: #666;
        }
        
        .item-date {
            font-size: 10pt;
            text-align: right;
            color: #666;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }
        
        .skill-item {
            display: flex;
            justify-content: space-between;
            font-size: 11pt;
        }
        
        .project-description {
            font-size: 11pt;
            margin: 5px 0;
            text-align: justify;
        }
        
        .tech-stack {
            font-size: 10pt;
            margin: 2px 0;
            color: #666;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 10pt;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 10px;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            .resume-container {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Header -->
        <div class="header">
            <h1>${resumeData?.personal_info.full_name}</h1>
            <div class="designation">${resumeData?.personal_info.designation}</div>
            <div class="contact-info">
                📧 ${resumeData?.personal_info.email} • 📞 ${resumeData?.personal_info.phone_num} • 📍 ${resumeData?.personal_info.address}
            </div>
            <div class="contact-info">
                🎂 ${resumeData?.personal_info.dob} • 💼 ${resumeData?.personal_info.total_years_of_experience} years experience
            </div>
        </div>

        <!-- Professional Summary -->
        <div class="section">
            <h2>PROFESSIONAL SUMMARY</h2>
            <p>${resumeData?.personal_info.resume_summary || resumeData?.personal_info.long_descriptive_summary}</p>
        </div>

        <!-- Work Experience -->
        <div class="section">
            <h2>WORK EXPERIENCE</h2>
            ${resumeData?.work_experience.map((exp: any) => `
                <div class="item">
                    <div class="item-header">
                        <div>
                            <h3 class="item-title">${exp.designation}</h3>
                            <p class="item-subtitle">▸ ${exp.company_name}</p>
                            <p class="item-details">📍 ${exp.company_location}</p>
                        </div>
                        <div class="item-date">
                            ${exp.start_date} - ${exp.end_date}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Education -->
        <div class="section">
            <h2>EDUCATION</h2>
            ${resumeData?.education.map((edu: any) => `
                <div class="item">
                    <div class="item-header">
                        <div>
                            <h3 class="item-title">${edu.degree}</h3>
                            <p class="item-subtitle">▸ ${edu.institution}</p>
                            <p class="item-details">📚 ${edu.field_of_study}</p>
                        </div>
                        <div class="item-date">
                            <div>${edu.start_date} - ${edu.end_date}</div>
                            ${edu.gpa ? `<div>🎯 GPA: ${edu.gpa}</div>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Technical Skills -->
        <div class="section">
            <h2>TECHNICAL SKILLS</h2>
            <div class="skills-grid">
                ${resumeData?.skills.map((skill: any) => `
                    <div class="skill-item">
                        <span>${skill.name}</span>
                        <span>${'★'.repeat(skill.rating)}${'☆'.repeat(5 - skill.rating)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Key Projects -->
        <div class="section">
            <h2>KEY PROJECTS</h2>
            ${resumeData?.projects.slice(0, 6).map((project: any) => `
                <div class="item">
                    <div class="item-header">
                        <h3 class="item-title">${project.title}</h3>
                        <div class="item-date">
                            ${project.start_date} - ${project.end_date || 'Present'}
                        </div>
                    </div>
                    <p class="item-details">
                        ▸ Role: ${project.role}${project.company ? ` at ${project.company}` : ''}
                    </p>
                    <p class="item-details">
                        ▸ Type: ${project.project_type} | Status: ${project.status}
                    </p>
                    <p class="project-description">
                        ▸ ${project.long_description}
                    </p>
                    <p class="tech-stack">
                        🔧 Tech Stack: ${[
                            ...(project.skills || []),
                            project.hosting_platform,
                            project.cicd_pipeline,
                            project.monitoring_tracking
                        ].filter(Boolean).join(', ')}
                    </p>
                </div>
            `).join('')}
        </div>

        <!-- Certifications -->
        ${resumeData?.certifications.length > 0 ? `
        <div class="section">
            <h2>CERTIFICATIONS</h2>
            ${resumeData?.certifications.map((cert: any) => `
                <div class="item">
                    <p style="font-size: 11pt; margin: 2px 0; font-weight: normal;">
                        ▸ ${cert.name} - ${cert.issuing_organization} (${cert.issue_date})${cert.expiry_date ? ` - Expires: ${cert.expiry_date}` : ''}
                    </p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
            Generated on ${new Date().toLocaleDateString()}
        </div>
    </div>
</body>
</html>
    `;

    // Write content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Add a script to handle PDF download after content loads
    printWindow.onload = () => {
      setTimeout(() => {
        // Add download button and auto-trigger print
        const downloadScript = printWindow.document.createElement('script');
        downloadScript.innerHTML = `
          // Auto-trigger print dialog
          window.print();
          
          // Add a download button as backup
          const downloadBtn = document.createElement('button');
          downloadBtn.innerHTML = 'Download PDF';
          downloadBtn.style.position = 'fixed';
          downloadBtn.style.top = '10px';
          downloadBtn.style.right = '10px';
          downloadBtn.style.zIndex = '9999';
          downloadBtn.style.padding = '10px 20px';
          downloadBtn.style.backgroundColor = '#007bff';
          downloadBtn.style.color = 'white';
          downloadBtn.style.border = 'none';
          downloadBtn.style.borderRadius = '4px';
          downloadBtn.style.cursor = 'pointer';
          downloadBtn.onclick = () => window.print();
          document.body.appendChild(downloadBtn);
          
          // Hide button when printing
          window.addEventListener('beforeprint', () => {
            downloadBtn.style.display = 'none';
          });
          
          window.addEventListener('afterprint', () => {
            downloadBtn.style.display = 'block';
          });
        `;
        printWindow.document.head.appendChild(downloadScript);
      }, 500);
    };
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Loader2 style={{ height: '32px', width: '32px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#666', fontSize: '11pt' }}>Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: '8px', fontSize: '11pt' }}>Failed to load resume</p>
          <p style={{ color: '#666', fontSize: '10pt' }}>{error || 'No data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Control Buttons */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
        flexDirection: 'column'
      }}>
        <button
          onClick={handleDownloadMarkdown}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#374151',
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff',
            fontSize: '10pt',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <FileText size={16} />
          Download MD
        </button>
        <button
          onClick={handleCopyToClipboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#374151',
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff',
            fontSize: '10pt',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Copy size={16} />
          Copy
        </button>
        <button
          onClick={handlePrintAsPDF}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#374151',
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff',
            fontSize: '10pt',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Download size={16} />
          Save as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div style={{
        maxWidth: '210mm',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.6',
        color: '#000'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {resumeData.personal_info.full_name}
          </h1>
          <p style={{ fontSize: '14pt', margin: '0 0 15px 0', fontWeight: '600' }}>
            {resumeData.personal_info.designation}
          </p>
          <div style={{ fontSize: '11pt', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <span>📧 {resumeData.personal_info.email}</span>
            <span>📞 {resumeData.personal_info.phone_num}</span>
            <span>📍 {resumeData.personal_info.address}</span>
          </div>
          <div style={{ fontSize: '11pt', marginTop: '5px' }}>
            <span>🎂 {resumeData.personal_info.dob}</span>
            <span style={{ marginLeft: '20px' }}>💼 {resumeData.personal_info.total_years_of_experience} years experience</span>
          </div>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ textAlign: 'justify' }}>
            {resumeData.personal_info.resume_summary || resumeData.personal_info.long_descriptive_summary}
          </p>
        </div>

        {/* Work Experience */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            WORK EXPERIENCE
          </h2>
          {resumeData.work_experience.map((exp: any, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '0' }}>{exp.designation}</h3>
                  <p style={{ fontSize: '11pt', margin: '2px 0', fontWeight: '600' }}>▸ {exp.company_name}</p>
                  <p style={{ fontSize: '10pt', margin: '2px 0', color: '#666' }}>📍 {exp.company_location}</p>
                </div>
                <div style={{ fontSize: '10pt', textAlign: 'right', color: '#666' }}>
                  {exp.start_date} - {exp.end_date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            EDUCATION
          </h2>
          {resumeData.education.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '0' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '11pt', margin: '2px 0', fontWeight: '600' }}>▸ {edu.institution}</p>
                  <p style={{ fontSize: '10pt', margin: '2px 0', color: '#666' }}>📚 {edu.field_of_study}</p>
                </div>
                <div style={{ fontSize: '10pt', textAlign: 'right', color: '#666' }}>
                  <div>{edu.start_date} - {edu.end_date}</div>
                  {edu.gpa && <div>🎯 GPA: {edu.gpa}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            TECHNICAL SKILLS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {resumeData.skills.map((skill: any, index: number) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11pt' }}>
                <span>{skill.name}</span>
                <span>{'★'.repeat(skill.rating)}{'☆'.repeat(5 - skill.rating)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            KEY PROJECTS
          </h2>
          {resumeData.projects.slice(0, 6).map((project: any, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '0' }}>{project.title}</h3>
                <div style={{ fontSize: '10pt', color: '#666' }}>
                  {project.start_date} - {project.end_date || 'Present'}
                </div>
              </div>
              <p style={{ fontSize: '10pt', margin: '2px 0', color: '#666' }}>
                ▸ Role: {project.role}{project.company ? ` at ${project.company}` : ''}
              </p>
              <p style={{ fontSize: '10pt', margin: '2px 0', color: '#666' }}>
                ▸ Type: {project.project_type} | Status: {project.status}
              </p>
              <p style={{ fontSize: '11pt', margin: '5px 0', textAlign: 'justify' }}>
                ▸ {project.long_description}
              </p>
              <p style={{ fontSize: '10pt', margin: '2px 0', color: '#666' }}>
                🔧 Tech Stack: {[
                  ...(project.skills || []),
                  project.hosting_platform,
                  project.cicd_pipeline,
                  project.monitoring_tracking
                ].filter(Boolean).join(', ')}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              CERTIFICATIONS
            </h2>
            {resumeData.certifications.map((cert: any, index: number) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <p style={{ fontSize: '11pt', margin: '2px 0', fontWeight: 'normal' }}>
                  ▸ {cert.name} - {cert.issuing_organization} ({cert.issue_date}){cert.expiry_date ? ` - Expires: ${cert.expiry_date}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '10pt', color: '#666', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          Generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          
          div[style*="position: fixed"] {
            display: none !important;
          }
          
          div[style*="backgroundColor: #f9fafb"] {
            background: white !important;
            padding: 0 !important;
          }
          
          div[style*="boxShadow"] {
            box-shadow: none !important;
          }
          
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume; 