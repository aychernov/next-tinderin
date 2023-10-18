'use client';
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HandleBuyCourse = () => {
    const [courses, setCourses] = useState([])
    const handlelBuyBnt = async () => {
        const response = await fetch(`/api/course`)
        const data = await response.json();
        console.log(data.courses)
        setCourses(data.courses)
    }

    // useEffect(() => {
    //     const response = async () => {
    //         const data = await fetch(`/api/course`)
    //         return data.json()
    //     }
    //     try {
    //         response().then(data => {
    //             setCourses(data.courses)
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, []);


    return (
        <div>
            <Button onClick={handlelBuyBnt}>Buy course</Button>
            {courses ? courses.map((course: { id: number, title: string, image: string, link: string }) => (
                <>
                    <div key={course.id}>ID: {course.id} Title: {course.title}</div>
                    <Link rel='prefetch' href={course.link} passHref target='_blank' >
                        <Image src={course.image} alt={'course-img'} width={100} height={100}/>
                    </Link>
                </>
            )) : null}
        </div>
    );
}