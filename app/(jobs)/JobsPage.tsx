"use client"

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import pageStyles from "./jobspage.module.scss";
import JobCard from "@/components/JobCard/JobCard";

const JobsPage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true); // Set flag to indicate data is being fetched
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          {
            limit: 10,
            offset: (page - 1) * 10,
          }
        );
        setData((prevData: any) => [...prevData, ...response.data.jdList]);
        setInitialFetchDone(true); // Set flag after initial fetch
        setReachedEnd(response.data.jdList.length === 0); // Check if no more data is available
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setFetchingData(false); // Reset flag after fetching is done
        setLoading(false);
      }
    };

    fetchData(); // Fetch data on initial render
  }, [page]); // Re-run on page change

  useEffect(() => {
    const handleScroll = () => {
      if (!fetchingData && !reachedEnd) {
        const { current } = parentRef;
        if (current) {
          const isAtBottom =
            window.innerHeight + window.scrollY >= current.offsetHeight;
          const isAtTop = window.scrollY === 0;
          if (isAtBottom) {
            setPage((prevPage) => prevPage + 1); // Load next page
          } else if (isAtTop) {
            // Logic to handle scrolling to the top if needed
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchingData, reachedEnd]);

  return (
    <div className={pageStyles.parent} ref={parentRef}>
      <div className={pageStyles.jobcard__grid}>
        {data.map((job: any) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
        {loading && <p>Loading...</p>}
        {reachedEnd && <p>No more data to load.</p>}
      </div>
    </div>
  );
};

export default JobsPage;
