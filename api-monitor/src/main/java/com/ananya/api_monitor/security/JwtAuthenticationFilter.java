package com.ananya.api_monitor.security;

import com.ananya.api_monitor.service.CustomUserDetailsService;
import com.ananya.api_monitor.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Read Authorization header
        String authHeader =
                request.getHeader("Authorization");

        // If no JWT is sent, continue normally
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Remove "Bearer " from the header
        String token =
                authHeader.substring(7);

        // Extract username from JWT
        String username =
                jwtService.extractUsername(token);

        System.out.println("Username from JWT: " + username);
        UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null &&
                jwtService.isTokenValid(token, userDetails.getUsername())) {
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
            System.out.println("Authentication successful");
        }

        filterChain.doFilter(request, response);
    }
}