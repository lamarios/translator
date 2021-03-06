import React from "react";
import styled from "styled-components";
import Service from "../Service";
import Title from "../basic/Title";
import PrimaryButton from "../basic/PrimaryButton";
import NewProjectDialog from "./NewProjectDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProjectList from "./ProjectList";
import SecondaryTitle from "../basic/SecondaryTitle";
import {fadeInLeft} from "../animations";


const AddProjectButton = styled(PrimaryButton)`
margin: 10px 0;
font-size: 15px;
padding: 5px 7px;
`;


const ProjectContainer = styled.div`
  margin:20px 0px;
animation: ${fadeInLeft} 0.25s ease-out;
`;


const PageHeader = styled.div`
    animation: ${fadeInLeft} 0.25s ease-out;
`;

export default class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.service = new Service();
        this.state = {projects: [], showNewProjectDialog: false, user: this.service.getUserData()};

        this.dismissDialog = this.dismissDialog.bind(this);
        this.refreshProjects = this.refreshProjects.bind(this);
    }

    componentDidMount() {
        this.refreshProjects();
    }

    refreshProjects() {
        this.service.getProjects()
            .then(projects => this.setState({projects: projects}));

    }

    dismissDialog() {
        this.setState({showNewProjectDialog: false}, this.refreshProjects);

    }

    render() {

        const asOwner = this.state.projects.filter(p => p.Owner.ID === this.state.user.ID);
        const asContributor = this.state.projects.filter(p => p.Owner.ID !== this.state.user.ID);

        return (<div>
            <PageHeader>
                <Title>Projects</Title>


                <AddProjectButton onClick={() => this.setState({showNewProjectDialog: true})}>
                    <FontAwesomeIcon icon={faPlus}/>
                    &nbsp;
                    Create project
                </AddProjectButton>
            </PageHeader>

            {asOwner.length > 0 && <ProjectContainer>
                <SecondaryTitle>Your Projects</SecondaryTitle>
                <ProjectList projects={asOwner}/>
            </ProjectContainer>}

            {asContributor.length > 0 && <ProjectContainer>
                <SecondaryTitle>As Contributor</SecondaryTitle>
                <ProjectList projects={asContributor}/>
            </ProjectContainer>}

            {this.state.showNewProjectDialog && <NewProjectDialog dismiss={this.dismissDialog}/>}
        </div>);
    }
}