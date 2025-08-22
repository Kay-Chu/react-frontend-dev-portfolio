import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };

    // Bind functions in constructor to avoid redefining them in render
    this.detailsModalShow = this.detailsModalShow.bind(this);
    this.detailsModalClose = this.detailsModalClose.bind(this);

    // UI carousel ref and handlers
    this.uiCarouselRef = React.createRef();
    this.scrollUILeft = this.scrollUILeft.bind(this);
    this.scrollUIRight = this.scrollUIRight.bind(this);
  }

  detailsModalShow(data) {
    this.setState({ detailsModalShow: true, deps: data });
  }

  detailsModalClose() {
    this.setState({ detailsModalShow: false });
  }

  scrollUILeft() {
    const el = this.uiCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: -Math.max(el.clientWidth * 0.8, 320), behavior: "smooth" });
  }

  scrollUIRight() {
    const el = this.uiCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.max(el.clientWidth * 0.8, 320), behavior: "smooth" });
  }

  render() {
    // Early return if props are not available
    if (!this.props.resumeProjects || !this.props.resumeBasicInfo || !this.props.resumeUIProjects) {
      return <div>Loading projects...</div>;
    }

    const sectionName = this.props.resumeBasicInfo.section_name.projects;
    const sectionName_UI = this.props.resumeBasicInfo.section_name.ui_projects;

    const uiProjects = this.props.resumeUIProjects.map((uiProject) => {
      const img = Array.isArray(uiProject.image) ? uiProject.image[0] : uiProject.image;
      return (
        <div
          className="ui-item"
          key={uiProject.title}
          style={{
            flex: "0 0 auto",
            width: 300,
            marginRight: 16,
            scrollSnapAlign: "start",
            textAlign: "center"
          }}
        >
          <img
            src={img}
            alt={uiProject.title}
            height="230"
            width="300"
            style={{ marginBottom: 0, paddingBottom: 0, position: "relative", borderRadius: 6 }}
          />
          <p className="project-title-settings" style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: 8 }}>
            {uiProject.title}
          </p>
        </div>
      );
    });

    const projects = this.props.resumeProjects.map((project) => {
      return (
        <div
          className="col-sm-12 col-md-6 col-lg-4"
          key={project.title}
          style={{ cursor: "pointer" }}
        >
          <span className="portfolio-item d-block">
            <div className="foto" onClick={() => this.detailsModalShow(project)}>
              <div>
                <img
                  src={project.images[0]}
                  alt="projectImages"
                  height="230"
                  style={{ marginBottom: 0, paddingBottom: 0, position: "relative" }}
                />
                <span className="project-date">{project.startDate}</span>
                <br />
                <p className="project-title-settings mt-3">
                  {project.title}
                </p>
              </div>
            </div>
          </span>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>

          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName_UI}</span>
          </h1>

          <div className="col-md-12 mx-auto" style={{ position: "relative" }}>
            {/* Controls */}
            <button
              aria-label="Scroll left"
              onClick={this.scrollUILeft}
              style={{
                position: "absolute",
                left: 0,
                top: "40%",
                transform: "translateY(-50%)",
                zIndex: 2,
                border: "none",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                cursor: "pointer"
              }}
            >
              ‹
            </button>
            <button
              aria-label="Scroll right"
              onClick={this.scrollUIRight}
              style={{
                position: "absolute",
                right: 0,
                top: "40%",
                transform: "translateY(-50%)",
                zIndex: 2,
                border: "none",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                cursor: "pointer"
              }}
            >
              ›
            </button>

            {/* Carousel */}
            <div
              ref={this.uiCarouselRef}
              style={{
                display: "flex",
                overflowX: "auto",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                gap: 0,
                padding: "4px 44px", // space for buttons
                scrollSnapType: "x mandatory"
              }}
              className="ui-carousel"
            >
              {/* hide scrollbar for Webkit */}
              <style>{`.ui-carousel::-webkit-scrollbar{display:none;}`}</style>
              {uiProjects}
            </div>
          </div>

          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={this.detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;