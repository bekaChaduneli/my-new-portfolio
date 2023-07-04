import { ArrowLeft, ArrowRight, CalendarClock } from "lucide-react";
import Link from "next/link";
import styles from "./allProjects.module.scss";
import { useRef, useState } from "react";
import classNames from "classnames";
export default function AllProjects({ data }) {
  const itemsPerPage = 12;
  const videoRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.projects.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleVideoMouseEnter = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleVideoMouseLeave = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };
  return (
    <div className={styles.Projects}>
      {currentItems?.map((project, index) => {
        return (
          <Link
            key={index}
            className={styles.Project__ProjectsLink}
            onMouseEnter={() => handleVideoMouseEnter(index)}
            onMouseLeave={() => handleVideoMouseLeave(index)}
            href={`/projects/${project?.id}`}
          >
            <div className={styles.Project} key={index}>
              <figure className={styles.Project__Background}>
                {project.videoLink ? (
                  <video
                    src={require(`../../assets/videos/${project.videoLink}.mp4`)}
                    ref={(ref) => {
                      videoRefs.current[index] = ref;
                    }}
                    className={styles.Project__Video}
                    loop
                    muted
                  />
                ) : (
                  <img
                    key={index}
                    className={styles.Project__BackgroundImage}
                    id={`image-${index}`}
                    alt="project-image"
                    src={`/images/${project.image[0]}`}
                  />
                )}
              </figure>
              <div className={styles.Project__ProjectAbout}>
                {project.name}
                {/* <div className={styles.Project__ProjectAboutBackground} />
                <h1 className={styles.Project__ProjectHeadline}>
                  {project.name}
                </h1>
                <div className={styles.Project__ProjectText}>
                  <p>{project.slug}</p>
                </div>
                <div className={styles.Project__ProjectDateWrapper}>
                  <CalendarClock className={styles.Project__ProjectDateIcon} />{" "}
                  <span className={styles.Project__ProjectDate}>
                    {project.date}
                  </span>
                </div>
                <div className={styles.Project__ProjectFrameworkWrapper}>
                  {project.frameworks?.map((framework, index) => (
                    <img
                      key={index}
                      src={`/images/${framework}.png`}
                      className={styles.Project__ProjectFramework}
                      alt="framework"
                    />
                  ))}
                </div>
                <div className={styles.Project__ProjectsLinksWrapper}></div> */}
              </div>
            </div>
          </Link>
        );
      })}
      <div className={styles.PaginationWrapper}>
        <div className={styles.Pagination}>
          <button
            className={classNames(styles.Pagination__Button, {
              [styles["Pagination__Button--disabled"]]: currentPage === 1,
            })}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            {" "}
            <ArrowLeft className={styles.Pagination__ButtonIcon} />
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              className={classNames(styles.Pagination__Element, {
                [styles["Pagination__Element--active"]]:
                  currentPage == index + 1,
              })}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </span>
          ))}
          <button
            className={classNames(styles.Pagination__Button, {
              [styles["Pagination__Button--disabled"]]:
                currentPage === totalPages,
            })}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowRight className={styles.Pagination__ButtonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
