import { useEffect, useState } from 'react';
import { CertificationsDomainData, Certification as CertificationType } from '@/types/data';
import { certifications, certificationSkills, getSkillById } from '@/data';

interface CertificationsDataReturn {
  certificationsData: CertificationsDomainData | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useCertificationsData(): CertificationsDataReturn {
  const [certificationsData, setCertificationsData] = useState<CertificationsDomainData | null>(null);
  const [welcomeText] = useState<string>('Professional certifications and credentials');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform certifications data into CertificationsDomainData format
      const transformedCertifications: CertificationType[] = certifications.map((cert) => {
        const skillIds = certificationSkills
          .filter((cs) => cs.certification_id === cert._id)
          .map((cs) => cs.skill_id);

        const skillNames = skillIds
          .map((skillId) => getSkillById(skillId))
          .filter((skill) => skill !== undefined)
          .map((skill) => skill!.name);

        return {
          id: parseInt(cert._id.split('_')[1], 10) || 0,
          name: cert.name,
          issuer: cert.issuer,
          issue_date: cert.issue_date,
          expiry_date: cert.expiry_date || undefined,
          credential_id: cert.credential_id || undefined,
          credential_url: cert.credential_url || undefined,
          skills: skillNames,
        };
      });

      setCertificationsData({
        certifications: transformedCertifications,
        welcome_text: welcomeText,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load certifications data');
    } finally {
      setLoading(false);
    }
  }, [welcomeText]);

  return { certificationsData, welcomeText, loading, error };
}

export default useCertificationsData; 