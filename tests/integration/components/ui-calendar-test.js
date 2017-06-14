import { moduleForComponent, test } from 'ember-qunit';
import { keyEvent, focus, blur } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-calendar', 'Integration | Component | ui calendar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{ui-calendar}}`);

  assert.ok(this.$('.ui.calendar').length, 'Container has .ui.calendar classes');
  assert.ok(this.$('.ui.calendar input').length, 'Input is rendered inside the container');
});

test('it renders initially selected date', function(assert) {
  assert.expect(1);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar type="date" date=date}}`);

  assert.equal(this.$('.ui.calendar input').val(), 'January 1, 2017');
});

test('it renders default icon', function(assert) {
  assert.expect(3);

  this.render(hbs`{{ui-calendar}}`);

  assert.ok(this.$('.ui.calendar .input').hasClass('left'), 'Input has `left` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('icon'), 'Input has `icon` class');
  assert.ok(this.$('.ui.calendar .input > .icon').hasClass('calendar'), 'Default icon is calendar');
});

test('it renders custom icon', function(assert) {
  assert.expect(3);

  this.render(hbs`{{ui-calendar icon="time"}}`);

  assert.ok(this.$('.ui.calendar .input').hasClass('left'), 'Input has `left` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('icon'), 'Input has `icon` class');
  assert.ok(this.$('.ui.calendar .input > .icon').hasClass('time'), 'Custom icon is rendered');
});

test('it renders without icon', function(assert) {
  assert.expect(3);

  this.render(hbs`{{ui-calendar icon=false}}`);

  assert.notOk(this.$('.ui.calendar .input').hasClass('left'), 'Input does not have `left` class');
  assert.notOk(this.$('.ui.calendar .input').hasClass('icon'), 'Input does not have `icon` class');
  assert.equal(this.$('.ui.calendar .input > .icon').length, 0, 'No icon is rendered');
});

test('it renders without clear button by default', function(assert) {
  assert.expect(2);

  this.render(hbs`{{ui-calendar clearIcon="remove"}}`);

  assert.notOk(this.$('.ui.calendar .input').hasClass('right'), 'Input does not have `right` class');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 0);
});

test('it renders the clear button when `allowClear` is true and has a value', function(assert) {
  assert.expect(2);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar type="date" date=date allowClear=true clearIcon="remove"}}`);

  assert.ok(this.$('.ui.calendar .input').hasClass('right'), 'Input has `right` class');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 1);
});

test('it does not renders the clear button when `allowClear` is true but it does not have a value', function(assert) {
  assert.expect(2);

  this.set('date', null);
  this.render(hbs`{{ui-calendar type="date" date=date allowClear=true clearIcon="remove"}}`);

  assert.notOk(this.$('.ui.calendar .input').hasClass('right'), 'Input does not have `right` class');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 0);
});

test('it renders default icon with clear button', function(assert) {
  assert.expect(5);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar date=date allowClear=true clearIcon="remove"}}`);

  assert.ok(this.$('.ui.calendar .input').hasClass('left'), 'Input has `left` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('right'), 'Input has `right` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('icon'), 'Input has `icon` class');
  assert.equal(this.$('.ui.calendar .input > .calendar.icon').length, 1, 'Calendar icon is rendered');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
});

test('it renders custom icon with clear button', function(assert) {
  assert.expect(5);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar date=date icon="time" allowClear=true clearIcon="remove"}}`);

  assert.ok(this.$('.ui.calendar .input').hasClass('left'), 'Input has `left` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('right'), 'Input has `right` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('icon'), 'Input has `icon` class');
  assert.equal(this.$('.ui.calendar .input > .time.icon').length, 1, 'Time icon is rendered');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
});

test('it renders without icon and with clear button', function(assert) {
  assert.expect(5);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar date=date icon=false allowClear=true clearIcon="remove"}}`);

  assert.notOk(this.$('.ui.calendar .input').hasClass('left'), 'Input does not have `left` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('right'), 'Input has `right` class');
  assert.ok(this.$('.ui.calendar .input').hasClass('icon'), 'Input has `icon` class');
  assert.equal(this.$('.ui.calendar .input > .calendar.icon').length, 0, 'Calendar icon is not rendered');
  assert.equal(this.$('.ui.calendar .input > .remove.icon').length, 1, 'Remove icon is rendered');
});

test('it clears the input value when clear button is clicked', function(assert) {
  assert.expect(2);

  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar type="date" date=date onChange=(action (mut date)) allowClear=true clearIcon="remove"}}`);

  assert.ok(this.get('date'), 'Selected date is empty');
  this.$('.ui.calendar .input > .remove.icon').trigger('click');
  assert.notOk(this.get('date'), 'Selected date is empty');
});

test('it triggers actions on keyboard events - onEnter', function(assert) {
  assert.expect(2);

  this.set('onEnter', (event) => assert.ok(event));
  this.set('onKeyDown', (event) => assert.ok(event));

  this.render(hbs`{{ui-calendar onEnter=onEnter onKeyDown=onKeyDown}}`);

  keyEvent('input', 'keydown', 13);
});

test('it triggers actions on keyboard events - onEscape', function(assert) {
  assert.expect(2);

  this.set('onEscape', (event) => assert.ok(event));
  this.set('onKeyDown', (event) => assert.ok(event));

  this.render(hbs`{{ui-calendar onEscape=onEscape onKeyDown=onKeyDown}}`);

  keyEvent('input', 'keydown', 27);
});

test('it triggers actions on keyboard events - onKeyDown', function(assert) {
  assert.expect(1);

  this.set('onKeyDown', (event) => assert.ok(event));

  this.render(hbs`{{ui-calendar onKeyDown=onKeyDown}}`);

  keyEvent('input', 'keydown', 32);
});

test('it triggers input events - onFocusIn', function(assert) {
  assert.expect(1);

  this.on('focusIn', () => assert.ok(true));

  this.render(hbs`{{ui-calendar onFocusIn=(action "focusIn")}}`);

  focus('input');
});

test('it triggers input events - onFocusOut', function(assert) {
  assert.expect(1);

  this.on('focusOut', () => assert.ok(true));

  this.render(hbs`{{ui-calendar onFocusOut=(action "focusOut")}}`);

  focus('input');
  blur('input');
});
