import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerTodosComponent } from './lister-todos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('ListerTodosComponent', () => {
  let component: ListerTodosComponent;
  let fixture: ComponentFixture<ListerTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ ListerTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerTodosComponent);
    component = fixture.componentInstance;
    component.todos = [
      {id: 4464, title: "First", description: "", date: new Date(), isActif: false, editing: false},
      {id: 4854, title: "Second", description: "", date: new Date(), isActif: true, editing: false},
      {id: 7864, title: "Third", description: "", date: new Date(), isActif: true, editing: false}]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be sort by actif boolean', () => {
    component.checkDo();
    expect(component.todos[2].isActif).toBe(false);
  })

  it('should be "yyyy-MM-dd" format date', () => {
    const date = component.getDate();
    const expectedDate = new Date().toISOString().slice(0,10);
    expect(date).toBe(expectedDate);
  })
});
