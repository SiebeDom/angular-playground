import {EnvironmentProviders, Provider} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MessageService} from 'primeng/api';
import {provideRouter} from '@angular/router';

const testProviders: (Provider | EnvironmentProviders)[] = [
  provideHttpClient(),
  provideHttpClientTesting(),
  MessageService,
  provideRouter([])
];
export default testProviders;
