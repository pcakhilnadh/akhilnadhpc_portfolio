import { site } from "../../config/site";
import "./personal-info.css";

/**
 * PersonalInfo: who this is. Role and location tags, the name, and the short
 * summary. Everything comes from src/data/profile.json (via config/site.ts),
 * so editing the text never touches layout.
 */
export function PersonalInfo() {
  return (
    <div className="info">
      <p className="info__tags">
        <span className="np-tag np-tag--solid">{site.title}</span>
        {site.yearsOfExperience !== null && (
          <span className="np-tag info__yoe" aria-label={`${site.yearsOfExperience} plus years of experience`}>
            <strong>{site.yearsOfExperience}+</strong> yrs exp
          </span>
        )}
        <span className="np-tag">{site.location}</span>
      </p>
      <h1 id="profile-title" className="info__name display">
        <span className="info__first">{site.firstName}</span>
        <span className="info__last">{site.lastName}</span>
      </h1>
      <p className="info__summary">{site.summary}</p>
    </div>
  );
}
