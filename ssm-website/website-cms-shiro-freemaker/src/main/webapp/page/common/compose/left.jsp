<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<div class="main-container" id="main-container">
	<div class="main-container-inner">
		<input type="hidden" id="classSelect" />
		<input type="hidden" id="classSelect1" />
		<a class="menu-toggler" id="menu-toggler" href="#"> <span class="menu-text"></span></a>
		<div class="sidebar" id="sidebar">
			<div class="sidebar-shortcuts" id="sidebar-shortcuts">
				<%--<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">--%>

					<%--<button class="btn btn-small btn-success" --%>
						<%--title="切换菜单">--%>
						<%--<i class="icon-pencil"></i>--%>
					<%--</button>--%>

					<%--<button class="btn btn-small btn-info" title="UI实例">--%>
						<%--<i class="icon-eye-open"></i>--%>
					<%--</button>--%>

					<%--<button class="btn btn-small btn-warning" title="" id="" onclick="">--%>
						<%--<i class="icon-book"></i>--%>
					<%--</button>--%>

					<%--<button class="btn btn-small btn-danger" title="菜单管理" id="menu"--%>
						<%--onclick="menu();">--%>
						<%--<i class="icon-folder-open"></i>--%>
					<%--</button>--%>
				<%--</div>--%>

				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-success"></span> <span class="btn btn-info"></span>

					<span class="btn btn-warning"></span> <span class="btn btn-danger"></span>
				</div>
			</div>
			<!-- #sidebar-shortcuts -->
			<ul class="nav nav-list">
				<li><a href="index.jsp"> <i class="icon-dashboard"></i> <span
						class="menu-text"> 控制台 </span>
				</a></li>
				<c:forEach items="${menuList}" var="menu">
					<shiro:hasPermission name="${menu.permissionCode}">
						<li id="li${menu.id}"><a href="javascript:void(0);"
							class="dropdown-toggle" onclick="openClass('li${menu.id}');">
								<i class="icon-th-list"></i> <span class="menu-text">${menu.permissionName }</span>
								<b class="arrow icon-angle-down"></b>
						</a>
							<ul class="submenu">
								<c:forEach items="${menu.childrenList}" var="sub">
									<shiro:hasPermission name="${sub.permissionCode}">
										<c:choose>
											<c:when test="${not empty sub.childrenList}">
												<li id="liChild${sub.id}" onclick="openClass('liChild${sub.id}');">
													<a class="dropdown-toggle">
														<i class="icon-double-angle-right"></i>${sub.permissionName }
														<b class="arrow icon-angle-down"></b>
													</a>
												</li>
												<ul class="submenu">
													<c:forEach items="${sub.childrenList}" var="sub1">
														<shiro:hasPermission name="${sub1.permissionCode}">
															<c:choose>
																<c:when test="${not empty sub1.childrenList}">
																	<li id="liChildern${sub1.id}" onclick="openClass('liChildern${sub1.id}');">
																		<a class="dropdown-toggle">
																			<i class="icon-double-angle-right"></i>${sub1.permissionName }
																			<b class="arrow icon-angle-down"></b>
																		</a>
																	</li>
																</c:when>
																<c:otherwise>
																	<li>
																		<a href="javascript:void(0);" onclick="myMenu('${sub1.url }')">
																			<i class="icon-double-angle-right"></i>${sub1.permissionName }
																		</a>
																	</li>
																</c:otherwise>
															</c:choose>
														</shiro:hasPermission>
													</c:forEach>
												</ul>
											</c:when>
											<c:otherwise>
												<li>
													<a href="javascript:void(0);" onclick="myMenu('${sub.url }')">
														<i class="icon-double-angle-right"></i>${sub.permissionName }
													</a>
												</li>
											</c:otherwise>
										</c:choose>
									</shiro:hasPermission>
								</c:forEach>
							</ul>
						<li>
					</shiro:hasPermission>
				</c:forEach>
			</ul>
			<!-- /.nav-list -->
			<div class="sidebar-collapse" id="sidebar-collapse">
				<i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	try {
		ace.settings.check('main-container', 'fixed');
		ace.settings.check('sidebar', 'fixed');
		ace.settings.check('sidebar', 'collapsed');
	} catch (e) {
	}
</script>