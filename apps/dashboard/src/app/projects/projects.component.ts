import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, AddProject, UpdateProject, DeleteProject, LoadProjects, selectAllProjects, selectCurrentProject, SelectProject } from '@workshop/core-data';
import { select, Store } from '@ngrx/store';
import { ProjectsFacade } from 'libs/core-data/src/lib/state/projects/projects.facade';

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
  currentProject$: Observable<Project>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private projectsFacade: ProjectsFacade,
    private customerService: CustomersService,
    private ns: NotificationsService,
  ) {
    this.projects$ = projectsFacade.allProjects$
    this.currentProject$ = projectsFacade.currentProject$;
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.projectsFacade.selectProject(null);
  }

  selectProject(project: Project) {
    this.projectsFacade.selectProject(project.id);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.projectsFacade.loadAll();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsFacade.createProject(project);

    // To be dealt with soon
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.projectsFacade.updateProject(project);

    // To be dealt with soon
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.projectsFacade.deleteProject(project);

    // To be dealt with soon
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
}

