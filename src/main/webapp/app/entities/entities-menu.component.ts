import { Component, Inject, Vue } from 'vue-property-decorator';
import AccountService from '@/account/account.service';

@Component
export default class EntitiesMenu extends Vue {
  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValues = {};

  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValues[authorities] = value;
      });
    console.log(this.hasAnyAuthorityValues);
    return this.hasAnyAuthorityValues[authorities] ?? false;
  }
}
