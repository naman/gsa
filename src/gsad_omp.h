/* Greenbone Security Assistant
 * $Id$
 * Description: Headers for GSA's OMP communication module.
 *
 * Authors:
 * Matthew Mundell <matthew.mundell@intevation.de>
 * Jan-Oliver Wagner <jan-oliver.wagner@greenbone.net>
 * Michael Wiegand <michael.wiegand@intevation.de>
 *
 * Copyright:
 * Copyright (C) 2009 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2,
 * or, at your option, any later version as published by the Free
 * Software Foundation
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

/**
 * @file gsad_omp.h
 * @brief Headers for GSA's OMP communication module.
 */

#ifndef _GSAD_OMP_H
#define _GSAD_OMP_H

#include <glib.h> /* for gboolean */

#include "gsad_base.h" /* for credentials_t */

void omp_init (int);

char * gsad_newtask (credentials_t *, const char *);

char * create_task_omp (credentials_t *, char *, char *, char *, char *);
char * delete_task_omp (credentials_t *, const char *);
char * abort_task_omp (credentials_t *, const char *);
char * start_task_omp (credentials_t *, const char *);

char * get_status_omp (credentials_t *, const char *, const char *,
                       const char *);

char * delete_report_omp (credentials_t *, const char *, const char *);
char * get_report_omp (credentials_t *, const char *, const char *,
                       unsigned int *, const unsigned int,
                       const unsigned int, const char *, const char *,
                       const char *);

char * get_lsc_credentials_omp (credentials_t *, const char *, const char *,
                                unsigned int *, const char *, const char *);
char * create_lsc_credential_omp (credentials_t *, char *, char *,
                                  const char *, const char *, const char *);
char * delete_lsc_credential_omp (credentials_t *, const char *);

char * get_targets_omp (credentials_t *, const char *, const char *);
char * create_target_omp (credentials_t *, char *, char *, char *,
                          const char *);
char * delete_target_omp (credentials_t *, const char *);

char * get_config_omp (credentials_t *, const char *, int);
char * get_configs_omp (credentials_t *, const char *, const char *);
char * save_config_omp (credentials_t *, const char *, const char *,
                        const char *, GArray *, GArray *, GArray *,
                        const char *);
char * get_config_family_omp (credentials_t *, const char *, const char *,
                              const char *, const char *, int);
char * save_config_family_omp (credentials_t *, const char *, const char *,
                               const char *, const char *, GArray *);
char * get_config_nvt_omp (credentials_t *, const char *, const char *,
                           const char *, const char *, const char *, int);
char * save_config_nvt_omp (credentials_t *, const char *, const char *,
                            const char *, const char *, const char *, GArray *,
                            GArray *, const char *);
char * create_config_omp (credentials_t *, char *, char *, char *,
                          const char *);
char * delete_config_omp (credentials_t *, const char *);

gboolean is_omp_authenticated (gchar *, gchar *);

char * get_nvt_details_omp (credentials_t *, const char *);

#endif /* not _GSAD_OMP_H */
