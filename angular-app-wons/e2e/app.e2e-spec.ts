/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app-wons', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app-wons', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app-wons');
    })
  });

  it('network-name should be pii-szg-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('pii-szg-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be angular-app-wons',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app-wons');
    });
  });

  
    it('UniversityComponent component should be loadable',() => {
      page.navigateTo('/UniversityComponent');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UniversityComponent');
      });
    });

    it('UniversityComponent table should have 6 columns',() => {
      page.navigateTo('/UniversityComponent');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Student component should be loadable',() => {
      page.navigateTo('/Student');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Student');
      });
    });

    it('Student table should have 7 columns',() => {
      page.navigateTo('/Student');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Profesor component should be loadable',() => {
      page.navigateTo('/Profesor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Profesor');
      });
    });

    it('Profesor table should have 8 columns',() => {
      page.navigateTo('/Profesor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Staff component should be loadable',() => {
      page.navigateTo('/Staff');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Staff');
      });
    });

    it('Staff table should have 7 columns',() => {
      page.navigateTo('/Staff');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('SystemAdministrator component should be loadable',() => {
      page.navigateTo('/SystemAdministrator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SystemAdministrator');
      });
    });

    it('SystemAdministrator table should have 7 columns',() => {
      page.navigateTo('/SystemAdministrator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('GrantAccessFER component should be loadable',() => {
      page.navigateTo('/GrantAccessFER');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('GrantAccessFER');
      });
    });
  
    it('AuthorizeAccessFER component should be loadable',() => {
      page.navigateTo('/AuthorizeAccessFER');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AuthorizeAccessFER');
      });
    });
  
    it('RevokeAccessFER component should be loadable',() => {
      page.navigateTo('/RevokeAccessFER');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RevokeAccessFER');
      });
    });
  
    it('AuthorizeAccessFFZG component should be loadable',() => {
      page.navigateTo('/AuthorizeAccessFFZG');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AuthorizeAccessFFZG');
      });
    });
  
    it('RevokeAccessFFZG component should be loadable',() => {
      page.navigateTo('/RevokeAccessFFZG');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RevokeAccessFFZG');
      });
    });
  
    it('AuthorizeAccessFSB component should be loadable',() => {
      page.navigateTo('/AuthorizeAccessFSB');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AuthorizeAccessFSB');
      });
    });
  
    it('RevokeAccessFSB component should be loadable',() => {
      page.navigateTo('/RevokeAccessFSB');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RevokeAccessFSB');
      });
    });
  

});