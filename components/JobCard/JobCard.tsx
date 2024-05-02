import React from "react";
import jobCardStyle from "./jobcard.module.scss";
import { Hourglass, SquareCheckBig } from "lucide-react";
import logoSmall from "../../assets/logoSmall.png";
import Image from "next/image";

interface JobCardProps {
  job: any; // Define the type of job details prop
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  console.log(job);
  return (
    <div className={jobCardStyle.parent}>
      {/* <div className={jobCardStyle.posttime__div}>
        <Hourglass color="#f56f42" strokeWidth={2} size={16} />
        <p>Posted 10 days ago</p>
      </div> */}

      <div className={jobCardStyle.job__heading__div}>
        <Image
          src={logoSmall}
          alt="company_logo"
          className={jobCardStyle.company__logo}
        />
        <div className={jobCardStyle.job__title__div}>
          <p className={jobCardStyle.company__name__text}>weekday</p>
          {job.jobRole && job.jobRole !== null ? (
            <p className={jobCardStyle.position__details__text}>
              {job.jobRole}
            </p>
          ) : (
            <></>
          )}
          {job.location && job.location !== null ? (
            <p className={jobCardStyle.location__details__text}>
              {job.location}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={jobCardStyle.salary__details__div}>
        <p>
          Estimated Salary:
          {job.minJdSalary && job.minJdSalary !== null ? (
            <>
              <a>
                {job.salaryCurrencyCode} {job.minJdSalary}K
              </a>
              <span> - </span>
            </>
          ) : (
            <></>
          )}
          {job.maxJdSalary && job.maxJdSalary !== null ? ( // Add parentheses here
            <a>
              {job.salaryCurrencyCode} {job.maxJdSalary}K
            </a>
          ) : (
            <></>
          )}
        </p>
        <SquareCheckBig color="#07a82a" size={20} />
      </div>

      <div className={jobCardStyle.about__company__div}>
        <p className={jobCardStyle.about__title}>About company</p>
        {job.jobDetailsFromCompany && job.jobDetailsFromCompany !== null ? (
          <p className={jobCardStyle.company__desc}>
            {job.jobDetailsFromCompany}
          </p>
        ) : (
          <></>
        )}
      </div>

      {job.minExp && job.minExp !== null ? (
        <div className={jobCardStyle.experience__details__div}>
          <p className={jobCardStyle.experience__title}>Minimum Experience</p>
          <p className={jobCardStyle.experience__value}>{job.minExp} years</p>
        </div>
      ) : (
        <></>
      )}

      <div className={jobCardStyle.cta__button__div}>
        <button className={jobCardStyle.easy__apply__button}>Easy Apply</button>
        <button className={jobCardStyle.unlock__referral__button}>
          Unlock Referral
        </button>
      </div>
    </div>
  );
};

export default JobCard;
