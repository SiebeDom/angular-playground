import {TestBed} from '@angular/core/testing';
import {describe, expect, it, vi} from 'vitest';
import {page, userEvent} from '@vitest/browser/context';
import {of} from 'rxjs';
import {PetCreate} from './pet-create';

describe(PetCreate.name, () => {
  it('Create Pet', async () => {
    const fixture = mountPetCreate();
    const component = fixture.componentInstance;

    const postSpy = vi.spyOn(component.httpClient, 'post').mockReturnValue(of("1"));
    const messageSpy = vi.spyOn(component.messageService, 'add');
    const navigateSpy = vi.spyOn(component.router, 'navigate').mockResolvedValue(true);

    fixture.detectChanges();

    await page.getByPlaceholder('Name').fill('Test');
    await page.getByPlaceholder('Type').fill('Dog');
    await page.getByPlaceholder('Mood').fill('Happy');
    await page.getByRole('combobox', {name: 'birthDate'}).click();
    await userEvent.keyboard('04/22/2026');
    await userEvent.keyboard('{Escape}');
    await page.getByRole('button', {name: 'Submit'}).first().click();

    expect(postSpy).toHaveBeenCalledWith('/api/pets', expect.objectContaining({name: 'Test'}));
    expect(messageSpy).toHaveBeenCalledWith(expect.objectContaining({severity: 'success'}));
    expect(navigateSpy).toHaveBeenCalledWith(['/pet']);
  });

  function mountPetCreate() {
    return TestBed.createComponent(PetCreate);
  }
});
