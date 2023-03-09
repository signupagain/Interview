<template>
	<section>
		<h2><a href="#Experience">個人經歷</a></h2>
		<dl>
			<dt>個人簡介</dt>
			<dd>
				前年畢業於國立嘉義大學，去年當完兵。畢業後發現原專業的工作不如我所願，便打算轉職。經過層層考量，最後選擇走前端工程師。
				所有相關專業知識皆為自學。從原先看
				<a
					href="https://www.runoob.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					菜鳥教程
				</a>
				， 再到實作
				<a
					href="https://developer.mozilla.org/en-US/docs/Learn"
					target="_blank"
					rel="noopener noreferrer"
				>
					MDN Web docs
				</a>
				上的大部份教程， 還有去了解Git SCM上的
				<a
					href="https://git-scm.com/book/en/v2"
					target="_blank"
					rel="noopener noreferrer"
				>
					Pro Git
				</a>
				，具備了點常識和一點點的基礎。 最後，接觸到
				<a
					href="https://www.w3schools.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					w3schools
				</a>
				和尚硅谷的
				<a
					href="https://www.youtube.com/playlist?list=PLmOn9nNkQxJEARHuEpVayY6ppiNlkvrnb"
					target="_blank"
					rel="noopener noreferrer"
				>
					Vue全家桶
				</a>
				，才有了突破和完成本作品的能力。請不吝指教。
			</dd>
			<dt>作品簡介</dt>
			<dd>
				&#12300;選圖界面&#12301;在搜尋欄的邏輯上花了很多心思，而捕球遊戲則是MDN上曾做過的練習。其餘只是一些簡單的小作品。
			</dd>
		</dl>
	</section>
</template>
<script>
	export default {
		name: "MyExperience",
	};
</script>
<style lang="scss" scoped>
	section {
		text-align: left;

		h2 {
			font-size: 4em;
			padding-left: 0.5em;
		}

		dt {
			font-size: 2em;
			padding-left: 2em;
		}

		dd {
			font-size: 1em;
			padding: 2em 3em;
		}
	}
</style>
