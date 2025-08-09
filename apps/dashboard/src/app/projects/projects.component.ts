import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, AddProject, UpdateProject, DeleteProject } from '@workshop/core-data';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private ns: NotificationsService,
    private store: Store<ProjectsState>
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map((projectsState: ProjectsState) => projectsState.projects)
    );
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project))

    // To be dealt with soon
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project))

    // To be dealt with soon
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    // To be dealt with soon
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
}

