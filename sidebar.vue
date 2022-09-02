<template>
<div>
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="/">SEGMAFLOT</b-navbar-brand>

      <b-button v-b-toggle.sidebar-1>
        <font-awesome-icon icon="bars" />
      </b-button>
    </b-navbar>

    <b-sidebar id="sidebar-1" title="Menu" bg-variant="dark" text-variant="light" shadow>
      <!-- HOME -->
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand to="/" class="fs-1">
          <font-awesome-icon icon="home" />
          <span v-text="$t('global.menu.home')">Home</span>
        </b-navbar-brand>
      </b-navbar>

      <!-- ENTIDADES -->
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand>
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="th-list" />
            <span class="" v-text="$t('global.menu.entities.main')">Entities</span>
          </span>
        </b-navbar-brand>

        <b-navbar-toggle target="navbar1">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="arrow-up-short"></b-icon>
            <b-icon v-else icon="arrow-down-short"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar1" is-nav>
          <b-navbar-nav class="ml-auto">
            <entities-menu></entities-menu>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-nav-item-dropdown right id="entity-menu" v-if="authenticated" active-class="active" class="pointer" data-cy="entity">
        <span slot="button-content" class="navbar-dropdown-menu">
          <font-awesome-icon icon="th-list" />
          <span class="no-bold" v-text="$t('global.menu.entities.main')">Entities</span>
        </span>
        <entities-menu></entities-menu>
        <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
      </b-nav-item-dropdown>

      <!-- _______________________________________________________________________________________________ -->

      <b-nav-item-dropdown
        right
        id="admin-menu"
        v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"
        :class="{ 'router-link-active': subIsActive('/admin') }"
        active-class="active"
        class="pointer"
        data-cy="adminMenu"
      >
        <span slot="button-content" class="navbar-dropdown-menu">
          <font-awesome-icon icon="users-cog" />
          <span class="no-bold" v-text="$t('global.menu.admin.main')">Administration</span>
        </span>
        <b-dropdown-item to="/admin/user-management" active-class="active">
          <font-awesome-icon icon="users" />
          <span v-text="$t('global.menu.admin.userManagement')">User management</span>
        </b-dropdown-item>
        <b-dropdown-item to="/admin/metrics" active-class="active">
          <font-awesome-icon icon="tachometer-alt" />
          <span v-text="$t('global.menu.admin.metrics')">Metrics</span>
        </b-dropdown-item>
        <b-dropdown-item to="/admin/health" active-class="active">
          <font-awesome-icon icon="heart" />
          <span v-text="$t('global.menu.admin.health')">Health</span>
        </b-dropdown-item>
        <b-dropdown-item to="/admin/configuration" active-class="active">
          <font-awesome-icon icon="cogs" />
          <span v-text="$t('global.menu.admin.configuration')">Configuration</span>
        </b-dropdown-item>
        <b-dropdown-item to="/admin/logs" active-class="active">
          <font-awesome-icon icon="tasks" />
          <span v-text="$t('global.menu.admin.logs')">Logs</span>
        </b-dropdown-item>
        <b-dropdown-item v-if="openAPIEnabled" to="/admin/docs" active-class="active">
          <font-awesome-icon icon="book" />
          <span v-text="$t('global.menu.admin.apidocs')">API</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown id="languagesnavBarDropdown" right v-if="languages && Object.keys(languages).length > 1">
        <span slot="button-content">
          <font-awesome-icon icon="flag" />
          <span class="no-bold" v-text="$t('global.menu.language')">Language</span>
        </span>
        <b-dropdown-item
          v-for="(value, key) in languages"
          :key="`lang-${key}`"
          v-on:click="changeLanguage(key)"
          :class="{ active: isActiveLanguage(key) }"
        >
          {{ value.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown
        right
        href="javascript:void(0);"
        id="account-menu"
        :class="{ 'router-link-active': subIsActive('/account') }"
        active-class="active"
        class="pointer"
        data-cy="accountMenu"
      >
        <span slot="button-content" class="navbar-dropdown-menu">
          <font-awesome-icon icon="user" />
          <span class="no-bold" v-text="$t('global.menu.account.main')"> Account </span>
        </span>
        <b-dropdown-item data-cy="settings" to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">
          <font-awesome-icon icon="wrench" />
          <span v-text="$t('global.menu.account.settings')">Settings</span>
        </b-dropdown-item>
        <b-dropdown-item data-cy="passwordItem" to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">
          <font-awesome-icon icon="lock" />
          <span v-text="$t('global.menu.account.password')">Password</span>
        </b-dropdown-item>
        <b-dropdown-item data-cy="logout" v-if="authenticated" v-on:click="logout()" id="logout" active-class="active">
          <font-awesome-icon icon="sign-out-alt" />
          <span v-text="$t('global.menu.account.logout')">Sign out</span>
        </b-dropdown-item>
        <b-dropdown-item data-cy="login" v-if="!authenticated" v-on:click="openLogin()" id="login" active-class="active">
          <font-awesome-icon icon="sign-in-alt" />
          <span v-text="$t('global.menu.account.login')">Sign in</span>
        </b-dropdown-item>
        <b-dropdown-item data-cy="register" to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated" active-class="active">
          <font-awesome-icon icon="user-plus" />
          <span v-text="$t('global.menu.account.register')">Register</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-sidebar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>