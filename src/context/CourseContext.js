import React, { useEffect, createContext, useState } from 'react'
import axios from 'axios';
import { SITE_URL } from '../Auth/Define';

export const CourseContext = createContext();
const CourseProvider = ({ children }) => {

    const [courseData, setCourseData] = useState([]);
    const [videoData, setVideoData] = useState([]);

    // console.log(courseData);
    // console.log(head);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseRes, videoRes,] = await axios.all([
                    axios.get(`${SITE_URL}new/app/api/get_course.php`),
                    axios.get(`${SITE_URL}new/app/api/get_video.php`),
                ]);


                setCourseData(courseRes.data);
                setVideoData(videoRes.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    



    const courseValue = {
        courseData,
        videoData,
    };

    return (
        <CourseContext.Provider value={courseValue}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseProvider;
