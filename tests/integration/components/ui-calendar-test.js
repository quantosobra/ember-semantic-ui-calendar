import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-calendar', 'Integration | Component | ui calendar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{ui-calendar}}`);
  assert.ok(this.$('.ui.calendar').length);
  assert.ok(this.$('.ui.calendar input').length);
});

test('it renders default icon', function(assert) {
  this.render(hbs`{{ui-calendar}}`);
  assert.ok(this.$('.ui.calendar .input > .icon').hasClass('calendar'));
});

test('it renders custom icon', function(assert) {
  this.render(hbs`{{ui-calendar icon="time"}}`);
  assert.ok(this.$('.ui.calendar .input > .icon').hasClass('time'));
});

test('it renders without icon', function(assert) {
  this.render(hbs`{{ui-calendar icon=false}}`);
  assert.equal(this.$('.ui.calendar .input > .icon').length, 0);
});

test('it renders initially selected date', function(assert) {
  this.set('date', new Date(2017, 0, 1));
  this.render(hbs`{{ui-calendar type="date" date=date}}`);
  assert.equal(this.$('.ui.calendar input').val(), 'January 1, 2017');
});
