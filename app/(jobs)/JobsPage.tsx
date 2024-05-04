"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NoData from "../../assets/no-data.svg"; // Image for no data state
import CircularProgress from "@mui/material/CircularProgress"; // Loading spinner component
import FormControl from "@mui/material/FormControl"; // Form control component
import InputLabel from "@mui/material/InputLabel"; // Label for form controls
import MenuItem from "@mui/material/MenuItem"; // Menu item component
import Select, { SelectChangeEvent } from "@mui/material/Select"; // Select component
import JobCard from "@/components/JobCard/JobCard"; // Component for displaying job cards
import { appConstants } from "../../constants/appConstants"; // Application constants
import { appConfig } from "@/config/appConfig"; // Application configuration
import pageStyles from "./jobspage.module.scss"; // Styles for the jobs page
import Image from "next/image"; // Next.js image component
import { RotateCcw } from "lucide-react"; // Icon component

// Component for displaying job listings
const JobsPage: React.FC = () => {
  // State variables for managing data, loading state, pagination, and filters
  const [data, setData] = useState<any>([]); // Job data
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1); // Current page for pagination
  const [initialFetchDone, setInitialFetchDone] = useState(false); // Flag indicating initial data fetch is done
  const [reachedEnd, setReachedEnd] = useState(false); // Flag indicating end of data reached
  const [fetchingData, setFetchingData] = useState(false); // Flag indicating data fetching in progress
  const [role, setRole] = useState(""); // Selected role filter
  const [location, setLocation] = useState(""); // Selected location filter
  const [minExperience, setMinExperience] = useState<number>(0); // Minimum experience filter
  const [minSalary, setMinSalary] = useState<number>(0); // Minimum salary filter
  const [emptyState, setEmptyState] = useState(false); // Flag indicating no data matching filters

  // Refs for DOM elements
  const parentRef = useRef<HTMLDivElement>(null); // Ref for parent container
  const roleSelectRef = useRef<HTMLSelectElement>(null); // Ref for role select element
  const locationSelectRef = useRef<HTMLSelectElement>(null); // Ref for location select element
  const experienceSelectRef = useRef<HTMLSelectElement>(null); // Ref for experience select element

  // Effect to focus on select elements when component mounts
  useEffect(() => {
    if (roleSelectRef.current) {
      roleSelectRef.current.focus();
    }
    if (locationSelectRef.current) {
      locationSelectRef.current.focus();
    }
    if (experienceSelectRef.current) {
      experienceSelectRef.current.focus();
    }
  }, []);

  // Effect for fetching data based on filters and pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.post(appConfig.API_URL, {
          limit: appConstants.NEWS_FETCH_LIMIT,
          offset: (page - 1) * appConstants.NEWS_FETCH_LIMIT,
        });

        const newData = [...data, ...response.data.jdList];

        const filteredData = newData.filter((job: any) => {
          const roleMatch = role === "" || job.jobRole === role;
          const locationMatch = location === "" || job.location === location;
          const minExperienceMatch =
            minExperience === 0 || job.minExp === minExperience;
          return roleMatch && locationMatch && minExperienceMatch;
        });

        setData(filteredData);
        setInitialFetchDone(true);
        setReachedEnd(response.data.jdList.length === 0);
        setEmptyState(filteredData.length === 0);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setFetchingData(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, role, location, minExperience, minSalary]);

  // Effect for handling scrolling for pagination
  useEffect(() => {
    const handleScroll = () => {
      if (!fetchingData && !reachedEnd) {
        const { current } = parentRef;
        if (current) {
          const isAtBottom =
            window.innerHeight + window.scrollY >= current.offsetHeight;
          const isAtTop = window.scrollY === 0;
          if (isAtBottom) {
            setPage((prevPage) => prevPage + 1);
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

  // Event handlers for filter changes
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleMinExperienceChange = (event: any) => {
    setMinExperience(Number(event.target.value));
  };

  // Reset filters
  const handleReset = () => {
    setRole("");
    setLocation("");
    setMinExperience(0);
    setMinSalary(0);
    if (roleSelectRef.current) {
      roleSelectRef.current.value = "";
    }
  };

  // JSX rendering
  return (
    <div className={pageStyles.parent} ref={parentRef}>
      <div className={pageStyles.filters__main__div}>
        {/* Select elements for filtering */}
        <FormControl style={{ width: "25%" }}>
          <InputLabel id="roles-select-label">Roles</InputLabel>
          <Select
            labelId="roles-select-label"
            ref={roleSelectRef}
            id="roles-select"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="ios">iOS</MenuItem>
            <MenuItem value="tech lead">Tech Lead</MenuItem>
            <MenuItem value="android">Android</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "25%" }}>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="locations-select-label"
            id="locations-select"
            ref={locationSelectRef}
            value={location}
            onChange={handleLocationChange}
          >
            <MenuItem value="bangalore">Bangalore</MenuItem>
            <MenuItem value="chennai">Chennai</MenuItem>
            <MenuItem value="delhi ncr">Delhi NCR</MenuItem>
            <MenuItem value="mumbai">Mumbai</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "25%" }}>
          <InputLabel id="minExp-select-label">Min. Experience</InputLabel>
          <Select
            labelId="minExp-select-label"
            id="minExp-select"
            ref={experienceSelectRef}
            value={minExperience}
            onChange={handleMinExperienceChange}
          >
            <MenuItem value={1}>1 year</MenuItem>
            <MenuItem value={2}>2 year</MenuItem>
            <MenuItem value={3}>3 year</MenuItem>
            <MenuItem value={4}>4 year</MenuItem>
            <MenuItem value={5}>5 year</MenuItem>
          </Select>
        </FormControl>

        {/* Reset button */}
        <button onClick={handleReset}>
          <RotateCcw size={20} />
        </button>
      </div>
      <hr />
      {/* Job listings */}
      <div className={pageStyles.jobcard__grid}>
        {emptyState ? (
          // Displayed when no jobs match the filters
          <div className={pageStyles.loading__div}>
            <Image
              className={pageStyles.nodata__image}
              src={NoData}
              alt="No Data"
            />
            <p>No jobs found with the selected filters</p>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : (
          // Display job cards
          data.map((job: any) => <JobCard key={job.jdUid} job={job} />)
        )}
        {/* Loading spinner */}
        {loading && (
          <div className={pageStyles.loading__div}>
            <CircularProgress />
          </div>
        )}
        {/* Message when no more data to load */}
        {reachedEnd && <p>No more data to load.</p>}
      </div>
    </div>
  );
};

export default JobsPage;
