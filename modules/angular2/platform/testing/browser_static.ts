import {
  APP_ID,
  NgZone,
  Provider,
  PLATFORM_COMMON_PROVIDERS,
  PLATFORM_INITIALIZER
} from 'angular2/core';
import {DirectiveResolver, ViewResolver} from 'angular2/compiler';
import {BROWSER_APP_COMMON_PROVIDERS} from 'angular2/src/platform/browser_common';
import {BrowserDomAdapter} from 'angular2/src/platform/browser/browser_adapter';

import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {MockAnimationBuilder} from '../../mock/mock/animation_builder_mock';
import {MockDirectiveResolver} from '../../mock/mock/directive_resolver_mock';
import {MockViewResolver} from '../../mock/mock/view_resolver_mock';
import {MockLocationStrategy} from '../../mock/mock/mock_location_strategy';
import {LocationStrategy} from 'angular2/platform/common';
import {MockNgZone} from '../../mock/mock/ng_zone_mock';

import {XHRImpl} from "angular2/src/platform/browser/xhr_impl";
import {XHR} from 'angular2/compiler';

import {TestComponentBuilder} from 'angular2/src/testing/test_component_builder';

import {BrowserDetection} from 'angular2/src/testing/utils';

import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';

import {CONST_EXPR} from '../../facade/lang';

import {Log} from 'angular2/src/testing/utils';

function initBrowserTests() {
  BrowserDomAdapter.makeCurrent();
  BrowserDetection.setup();
}

/**
 * Default platform providers for testing without a compiler.
 */
export const TEST_BROWSER_STATIC_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> =
    CONST_EXPR([
      PLATFORM_COMMON_PROVIDERS,
      new Provider(PLATFORM_INITIALIZER, {useValue: initBrowserTests, multi: true})
    ]);

export const ADDITIONAL_TEST_BROWSER_PROVIDERS: Array<any /*Type | Provider | any[]*/> =
    CONST_EXPR([
      new Provider(APP_ID, {useValue: 'a'}),
      ELEMENT_PROBE_PROVIDERS,
      new Provider(DirectiveResolver, {useClass: MockDirectiveResolver}),
      new Provider(ViewResolver, {useClass: MockViewResolver}),
      Log,
      TestComponentBuilder,
      new Provider(NgZone, {useClass: MockNgZone}),
      new Provider(LocationStrategy, {useClass: MockLocationStrategy}),
      new Provider(AnimationBuilder, {useClass: MockAnimationBuilder}),
    ]);

/**
 * Default application providers for testing without a compiler.
 */
export const TEST_BROWSER_STATIC_APPLICATION_PROVIDERS: Array<any /*Type | Provider | any[]*/> =
    CONST_EXPR([
      BROWSER_APP_COMMON_PROVIDERS,
      new Provider(XHR, {useClass: XHRImpl}),
      ADDITIONAL_TEST_BROWSER_PROVIDERS
    ]);
