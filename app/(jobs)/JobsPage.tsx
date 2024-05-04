"use client"

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NoData from "../../assets/no-data.svg"
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import JobCard from "@/components/JobCard/JobCard";
import { appConstants } from "../../constants/appConstants";
import pageStyles from "./jobspage.module.scss";
import Image from "next/image";

const JobsPage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('')
  const [emptyState, setEmptyState] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          {
            limit: appConstants.NEWS_FETCH_LIMIT,
            offset: (page - 1) * 10,
          }
        );

        // Combine new data with existing data
        const newData = [...data, ...response.data.jdList];

        // Filter the combined data based on the selected role
        const filteredData = newData.filter((job: any) => {
          const roleMatch = role === '' || job.jobRole === role;
          const locationMatch = location === '' || job.location === location;
          return roleMatch && locationMatch;
        });

        setData(filteredData);
        setInitialFetchDone(true);
        setReachedEnd(response.data.jdList.length === 0);
        setEmptyState(filteredData.length === 0); // Check if filtered data is empty
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setFetchingData(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, role, location]); // Re-run on page or role change

  useEffect(() => {
    const handleScroll = () => {
      if (!fetchingData && !reachedEnd) {
        const { current } = parentRef;
        if (current) {
          const isAtBottom =
            window.innerHeight + window.scrollY >= current.offsetHeight;
          const isAtTop = window.scrollY === 0;
          if (isAtBottom) {
            setPage(prevPage => prevPage + 1);
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

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string)
  }

  return (
    <div className={pageStyles.parent} ref={parentRef}>
      <div className={pageStyles.filters__main__div}>
        <FormControl style={{ width: "25%" }}>
          <InputLabel id="roles-select-label">Roles</InputLabel>
          <Select
            labelId="roles-select-label"
            id="roles-select"
            value={role}
            onChange={handleRoleChange}
          >
            {/* <MenuItem value="">All</MenuItem> */}
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="ios">iOS</MenuItem>
            <MenuItem value="tech lead">Tech Lead</MenuItem>
            <MenuItem value="android">Android</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "25%" }}>
          <InputLabel id="roles-select-label">Location</InputLabel>
          <Select
            labelId="locations-select-label"
            id="locations-select"
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
      </div>
      <hr />
      <div className={pageStyles.jobcard__grid}>
        {emptyState ? (
          <div className={pageStyles.loading__div}>
            {/* <p>Sgs</p>
            <p>No jobs found with the selected filters</p> */}
            <Image className={pageStyles.nodata__image} src={NoData} alt="No Data"/>
            <p>No jobs found with the selected filters</p>
            <button>Reset</button>
        </div>
        ) : (
          data.map((job: any) => (
            <JobCard key={job.jdUid} job={job} />
          ))
        )}
        {loading && (
          <div className={pageStyles.loading__div}>
            <CircularProgress />
          </div>
        )}
        {reachedEnd && <p>No more data to load.</p>}
      </div>
    </div>
  );
};

export default JobsPage;
