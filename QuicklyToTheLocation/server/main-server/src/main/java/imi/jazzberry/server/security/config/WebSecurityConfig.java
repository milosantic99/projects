package imi.jazzberry.server.security.config;

import imi.jazzberry.server.config.JwtConfig;
import imi.jazzberry.server.filter.CustomAuthenticationFilter;
import imi.jazzberry.server.filter.CustomAuthorizationFilter;
import imi.jazzberry.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private final JwtConfig jwtConfig;
    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        var customAuthenticationFilter = new CustomAuthenticationFilter(jwtConfig, authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/login");

        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/v*/users/register").permitAll()
                .antMatchers("/api/v*/auth/login", "/api/v*/auth/token/refresh").permitAll()
                .antMatchers("/swagger-ui/**", "/v3/api-docs/**").hasAuthority("ROLE_DEVELOPER")
                .antMatchers("/api/v*/users/role/**").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v*/users/all/**").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v*/users/{username}/role").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v*/users/{username}/**")
                    .hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                .antMatchers("/api/v*/users/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                .antMatchers("api/v*/posts/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")
                .antMatchers("api/v*/locations/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")
                .antMatchers("api/v*/followings/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")
                .antMatchers("api/v*/commentaries/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")
                .anyRequest().authenticated()
                .and()
            .httpBasic();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }

    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

