import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, triggerEvent } from '@ember/test-helpers';
import { keyEvent, focus, blur } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui calendar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`{{ui-calendar}}`);

    assert.ok(findAll('.ui.calendar').length, 'Container has .ui.calendar classes');
    assert.ok(findAll('.ui.calendar input').length, 'Input is rendered inside the container');
  });

  test('it renders initially selected date', async function(assert) {
    assert.expect(1);

    this.set('date', new Date(2017, 0, 1));
    await render(hbs`{{ui-calendar type="date" date=date}}`);

    assert.equal(find('.ui.calendar input').value, 'January 1, 2017');
  });

  test('it renders default icon', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ui-calendar}}`);

    assert.ok(find('.ui.calendar .input').classList.contains('left'), 'Input has `left` class');
    assert.ok(find('.ui.calendar .input').classList.contains('icon'), 'Input has `icon` class');
    assert.ok(find('.ui.calendar .input > .icon').classList.contains('calendar'), 'Default icon is calendar');
  });

  test('it renders custom icon', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ui-calendar icon="time"}}`);

    assert.ok(find('.ui.calendar .input').classList.contains('left'), 'Input has `left` class');
    assert.ok(find('.ui.calendar .input').classList.contains('icon'), 'Input has `icon` class');
    assert.ok(find('.ui.calendar .input > .icon').classList.contains('time'), 'Custom icon is rendered');
  });

  test('it renders without icon', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ui-calendar icon=false}}`);

    assert.notOk(find('.ui.calendar .input').classList.contains('left'), 'Input does not have `left` class');
    assert.notOk(find('.ui.calendar .input').classList.contains('icon'), 'Input does not have `icon` class');
    assert.equal(findAll('.ui.calendar .input > .icon').length, 0, 'No icon is rendered');
  });

  test('it renders without clear button by default', async function(assert) {
    assert.expect(2);

    await render(hbs`{{ui-calendar clearIcon="remove"}}`);

    assert.notOk(find('.ui.calendar .input').classList.contains('right'), 'Input does not have `right` class');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 0);
  });

  test('it renders the clear button when `allowClear` is true and has a value', async function(assert) {
    assert.expect(2);

    this.set('date', new Date(2017, 0, 1));
    await render(hbs`{{ui-calendar type="date" date=date allowClear=true clearIcon="remove"}}`);

    assert.ok(find('.ui.calendar .input').classList.contains('right'), 'Input has `right` class');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 1);
  });

  test('it does not renders the clear button when `allowClear` is true but it does not have a value', async function(assert) {
    assert.expect(2);

    this.set('date', null);
    await render(hbs`{{ui-calendar type="date" date=date allowClear=true clearIcon="remove"}}`);

    assert.notOk(find('.ui.calendar .input').classList.contains('right'), 'Input does not have `right` class');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 0);
  });

  test('it renders default icon with clear button', async function(assert) {
    assert.expect(5);

    this.set('date', new Date(2017, 0, 1));
    await render(hbs`{{ui-calendar date=date allowClear=true clearIcon="remove"}}`);

    assert.ok(find('.ui.calendar .input').classList.contains('left'), 'Input has `left` class');
    assert.ok(find('.ui.calendar .input').classList.contains('right'), 'Input has `right` class');
    assert.ok(find('.ui.calendar .input').classList.contains('icon'), 'Input has `icon` class');
    assert.equal(findAll('.ui.calendar .input > .calendar.icon').length, 1, 'Calendar icon is rendered');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
  });

  test('it renders custom icon with clear button', async function(assert) {
    assert.expect(5);

    this.set('date', new Date(2017, 0, 1));
    await render(hbs`{{ui-calendar date=date icon="time" allowClear=true clearIcon="remove"}}`);

    assert.ok(find('.ui.calendar .input').classList.contains('left'), 'Input has `left` class');
    assert.ok(find('.ui.calendar .input').classList.contains('right'), 'Input has `right` class');
    assert.ok(find('.ui.calendar .input').classList.contains('icon'), 'Input has `icon` class');
    assert.equal(findAll('.ui.calendar .input > .time.icon').length, 1, 'Time icon is rendered');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
  });

  test('it renders without icon and with clear button', async function(assert) {
    assert.expect(5);

    this.set('date', new Date(2017, 0, 1));
    await render(hbs`{{ui-calendar date=date icon=false allowClear=true clearIcon="remove"}}`);

    assert.notOk(find('.ui.calendar .input').classList.contains('left'), 'Input does not have `left` class');
    assert.ok(find('.ui.calendar .input').classList.contains('right'), 'Input has `right` class');
    assert.ok(find('.ui.calendar .input').classList.contains('icon'), 'Input has `icon` class');
    assert.equal(findAll('.ui.calendar .input > .calendar.icon').length, 0, 'Calendar icon is not rendered');
    assert.equal(findAll('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
  });

  test('it clears the input value when clear button is clicked', async function(assert) {
    assert.expect(2);

    this.set('date', new Date(2017, 0, 1));
    await render(
      hbs`{{ui-calendar type="date" date=date onChange=(action (mut date)) allowClear=true clearIcon="remove"}}`
    );

    assert.ok(this.get('date'), 'Selected date is empty');
    await click('.ui.calendar .input > .remove.icon');
    assert.notOk(this.get('date'), 'Selected date is empty');
  });

  test('it triggers actions on keyboard events - onEnter', async function(assert) {
    assert.expect(2);

    this.set('onEnter', (event) => assert.ok(event));
    this.set('onKeyDown', (event) => assert.ok(event));

    await render(hbs`{{ui-calendar onEnter=onEnter onKeyDown=onKeyDown}}`);

    keyEvent('input', 'keydown', 13);
  });

  test('it triggers actions on keyboard events - onEscape', async function(assert) {
    assert.expect(2);

    this.set('onEscape', (event) => assert.ok(event));
    this.set('onKeyDown', (event) => assert.ok(event));

    await render(hbs`{{ui-calendar onEscape=onEscape onKeyDown=onKeyDown}}`);

    keyEvent('input', 'keydown', 27);
  });

  test('it triggers actions on keyboard events - onKeyDown', async function(assert) {
    assert.expect(1);

    this.set('onKeyDown', (event) => assert.ok(event));

    await render(hbs`{{ui-calendar onKeyDown=onKeyDown}}`);

    keyEvent('input', 'keydown', 32);
  });

  test('it triggers input events - onFocusIn', async function(assert) {
    assert.expect(1);

    this.actions.focusIn = () => assert.ok(true);

    await render(hbs`{{ui-calendar onFocusIn=(action "focusIn")}}`);

    focus('input');
  });

  test('it triggers input events - onFocusOut', async function(assert) {
    assert.expect(1);

    this.actions.focusOut = () => assert.ok(true);

    await render(hbs`{{ui-calendar onFocusOut=(action "focusOut")}}`);

    focus('input');
    blur('input');
  });
});