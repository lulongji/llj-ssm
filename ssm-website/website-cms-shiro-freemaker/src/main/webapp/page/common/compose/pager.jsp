<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<div class="modal-footer no-margin-top">
	<div class="col-sm-6">
		<div id="sample-table-2_info" class="dataTables_info" style="text-align: left;">当前第 ${page.pageNo}/${page.totalPageNum} 页  共 ${page.totalNum} 条记录</div>
	</div>

	<div class="col-sm-6">
		<div class="dataTables_paginate paging_bootstrap">
			<ul class="pagination">
				<li class="prevPage disabled" >
					<a href="javascript:void(0);" id="pagerprev">
						<i class="icon-double-angle-left"></i>
					</a>
				</li>
				<li class="next">
					<a href="javascript:void(0);" id="pagernext">
						<i class="icon-double-angle-right"></i>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
<script type="text/javascript">
	jQuery(function($) {
		var hidInputPageNo="<input type='hidden' name='pageNo' value='${page.pageNo}'/>";
		var hidInputPageSize="<input type='hidden' name='pageSize' value='${page.pageSize}'/>";
		$("#queryForm").append(hidInputPageNo);
		$("#queryForm").append(hidInputPageSize);

		/** 分页组件展示开始  */
		var totalPageNum = ${page.totalPageNum};
		var pageNo = ${page.pageNo};
		var pageHtml = "";
		/** 当前页数小于5 */
		if( totalPageNum < 5 && totalPageNum > 0){
			for(var i=1;i<=totalPageNum;i++){
				if(pageNo == i){
					pageHtml += "<li class='active'><a tagflag='pageNo' href='javascript:void(0);return false;'>"+i+"</a></li>";
				}else{
					pageHtml += "<li><a tagflag='pageNo' href='javascript:void(0);return false;'>"+i+"</a></li>";
				}
			}
		}
		/** 当前页数大于5 */
		if(totalPageNum >= 5){
			/** 区分 1.当前页小于3；2.当前页大于3，小于总页码数减去2；3.大于总页码数减去2  */
			var tmpPageTotal = totalPageNum - 2;
			/** 页码偏移量 */
			var offsetNo = 0;
			/** 小于3，只展示前五页，偏移量为0 */
			if(pageNo < 3){
				offsetNo = 0;
			}
			/** 展示中间五页 ，偏移量为当前页码减去2*/
			if(pageNo > 3 && pageNo <= tmpPageTotal){
				offsetNo = pageNo -3;
			}

			/** 展示最后五页 ，偏移量为总页数减去4*/
			if(pageNo > tmpPageTotal){
				offsetNo = tmpPageTotal - 3;
			}
			for(var i=1;i <= 5;i++){
				var relPageNo = Number(offsetNo+i);
				if(pageNo == relPageNo){
					pageHtml += "<li class='active'><a tagflag='pageNo' href='javascript:void(0);return false;'>"+relPageNo+"</a></li>";
				}else{
					pageHtml += "<li><a tagflag='pageNo' href='javascript:void(0);return false;'>"+relPageNo+"</a></li>";
				}
			}
		}
		$(".prevPage").after(pageHtml);

		if(pageNo == 1){
			$("#pagerprev").parent().addClass("disabled");
		}else{
			$("#pagerprev").parent().removeClass("disabled");
		}
		if(pageNo == totalPageNum||pageNo>totalPageNum){
			$("#pagernext").parent().addClass("disabled");
		}else{
			$("#pagernext").parent().removeClass("disabled");
		}
		/** 分页组件展示结束  */
		//上一页
		$("#pagerprev").unbind("click").click(function(){
			if(pageNo == 1){
				alert("已经是第一页");
				return false;
			}
			$("input[name='pageNo']").val(Number(pageNo-1));
			submitForm();
		});
		//下一页
		$("#pagernext").unbind("click").click(function(){
			if(pageNo == totalPageNum||pageNo>totalPageNum){
				alert("已经是最后一页");
				return false;
			}
			$("input[name='pageNo']").val(Number(pageNo+1));
			submitForm();
		});

		$("a[tagflag='pageNo']").each(function(){
			$(this).unbind('click').click(function(){
				var newPageNo = Number($(this).text());
				$("input[name='pageNo']").val(Number(newPageNo));
				submitForm();
			});
		});
	});

	//分页提交数据
	function submitForm(){
	    debugger
		var data = decodeURIComponent($("form").serialize().replace(/\+/g,""));
		var url = $("form").attr("action");
		$("input[name='pageNo']").val();
		$.ajax({
			type : "post",
			async : false, // 同步请求
			data: data,
			url : url,
			success : function(data) {
				$("#main-content").empty();
				$("#main-content").html(data);// 要刷新的div
			},
			error : function(e) {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	}
</script>