import { ExerciseAppPage } from './app.po';

describe('exercise-app App', function() {
  let page: ExerciseAppPage;

  beforeEach(() => {
    page = new ExerciseAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
