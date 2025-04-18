import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar"
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import { fetchCourseDetail } from "../services/operations/courseRelated"
import { setCourseSectionData,setEntireCourseData } from "../Redux/Slices/viewCourseSlice"
// import {
//   setCompletedLectures,
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
// } from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await fetchCourseDetail(courseId, token)
      console.log("Course Data here... ", courseData)
      dispatch(setCourseSectionData(courseData?.courseContent))
      dispatch(setEntireCourseData(courseData))
      // dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      // dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
