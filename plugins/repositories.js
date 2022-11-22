import rawRepository from '~/utils/rawRepository';
import nestedRepository from '~/utils/nestedRepository';
export default ({ $axios }, inject) => {
  
  const rawRepositoryInjector = rawRepository($axios);
  const nestedRepositoryInjector = nestedRepository($axios);
  
  const repositories = {
    budgets: rawRepositoryInjector('budgets'),
    cfg: rawRepositoryInjector('config'),
    archives: rawRepositoryInjector('archives'),
    navLinks: rawRepositoryInjector('nav-links'),
    costs: {
      ...rawRepositoryInjector('costs'),
      ...nestedRepositoryInjector('costs/budget/:budgetId')
    }
  };

  inject('repositories', repositories);

}
