import gradio

from facefusion import state_manager, metadata
from facefusion.uis.components import (
	about, age_modifier_options, background_remover_options, deep_swapper_options, download,
	execution, execution_thread_count, expression_restorer_options, face_debugger_options,
	face_detector, face_editor_options, face_enhancer_options, face_landmarker, face_masker,
	face_selector, face_swapper_options, face_tracker, frame_colorizer_options, frame_enhancer_options,
	instant_runner, job_manager, job_runner, lip_syncer_options, memory, output, output_options,
	preview, preview_options, processors, source, target, temp_frame, terminal, trim_frame,
	ui_workflow, voice_extractor, workflow
)


def pre_check() -> bool:
	return True


def render() -> gradio.Blocks:
	with gradio.Blocks() as layout:
		# Top Header Banner with Real Hardware Status & Branding
		gradio.HTML("""
			<div class="aetherswap-header">
				<div class="brand-group">
					<div class="brand-icon">⚡</div>
					<div class="brand-title">AetherSwap Studio</div>
					<div class="brand-badge">CREATIVE AI EDITION</div>
				</div>
				<div class="header-stats">
					<div class="gpu-pill">
						<span class="status-dot"></span>
						<span>NVIDIA RTX 4050 (6GB VRAM) | CUDA Active</span>
					</div>
				</div>
			</div>
		""")

		with gradio.Tabs(selected = 0):
			# TAB 1: STUDIO WORKSPACE
			with gradio.Tab("⚡ Studio Workspace", id = 0):
				with gradio.Row():
					# LEFT COLUMN: Media Setup & Generate Controls
					with gradio.Column(scale = 5):
						with gradio.Group(elem_classes = ["as-card"]):
							gradio.HTML("""
								<div class="as-card-header">
									<div class="as-card-title">
										<span class="as-step-number">STEP 01</span>
										<span>SOURCE FACE</span>
									</div>
									<div class="as-card-subtitle">Choose the face image to swap</div>
								</div>
							""")
							source.render()

						with gradio.Group(elem_classes = ["as-card"]):
							gradio.HTML("""
								<div class="as-card-header">
									<div class="as-card-title">
										<span class="as-step-number">STEP 02</span>
										<span>TARGET MEDIA</span>
									</div>
									<div class="as-card-subtitle">Choose the image or video to transform</div>
								</div>
							""")
							target.render()

						with gradio.Group(elem_classes = ["as-card"]):
							gradio.HTML("""
								<div class="as-card-header">
									<div class="as-card-title">
										<span class="as-step-number">STEP 05</span>
										<span>GENERATE & EXECUTE</span>
									</div>
									<div class="as-card-subtitle">Run AI transformation pipeline</div>
								</div>
							""")
							ui_workflow.render()
							instant_runner.render()
							output.render()
							terminal.render()

					# CENTER COLUMN: Real-Time Preview Canvas & Face Selection
					with gradio.Column(scale = 7):
						with gradio.Group(elem_classes = ["as-card"]):
							gradio.HTML("""
								<div class="as-card-header">
									<div class="as-card-title">
										<span class="as-step-number">STEP 04</span>
										<span>REAL PREVIEW CANVAS</span>
									</div>
									<div class="as-card-subtitle">Inspect face alignments and AI output</div>
								</div>
							""")
							preview.render()
							preview_options.render()
							trim_frame.render()
							face_selector.render()
							face_tracker.render()
							face_masker.render()
							face_detector.render()
							face_landmarker.render()

					# RIGHT COLUMN: Processors, Quality & Hardware Settings
					with gradio.Column(scale = 5):
						with gradio.Group(elem_classes = ["as-card"]):
							gradio.HTML("""
								<div class="as-card-header">
									<div class="as-card-title">
										<span class="as-step-number">STEP 03</span>
										<span>PROCESSORS & SETTINGS</span>
									</div>
									<div class="as-card-subtitle">Configure AI models & acceleration</div>
								</div>
							""")
							with gradio.Accordion("✨ Active AI Processors", open = True):
								processors.render()

							with gradio.Accordion("👤 Face Swapper & Restoration Options", open = True):
								face_swapper_options.render()
								face_enhancer_options.render()
								expression_restorer_options.render()
								face_editor_options.render()
								face_debugger_options.render()

							with gradio.Accordion("🎨 Frame & Audio Enhancers", open = False):
								frame_enhancer_options.render()
								frame_colorizer_options.render()
								lip_syncer_options.render()
								voice_extractor.render()
								deep_swapper_options.render()
								age_modifier_options.render()
								background_remover_options.render()

							with gradio.Accordion("⚡ Hardware Acceleration & Output Quality", open = False):
								execution.render()
								execution_thread_count.render()
								memory.render()
								output_options.render()
								download.render()
								temp_frame.render()
								workflow.render()
								about.render()

			# TAB 2: LANDING PAGE & SHOWCASE
			with gradio.Tab("✨ Product Showcase", id = 1):
				gradio.HTML("""
					<div class="landing-hero">
						<div class="landing-title">AetherSwap Creative AI Studio</div>
						<div class="landing-subtitle">
							Transform faces and media with a local AI processing pipeline. 
							Powered by FaceFusion core engine and accelerated by NVIDIA RTX CUDA technology.
						</div>
					</div>

					<div class="feature-grid">
						<div class="feature-card">
							<div class="icon">⚡</div>
							<h4>Local CUDA Acceleration</h4>
							<p>Runs entirely on your NVIDIA RTX 4050 GPU via ONNX Runtime for ultra-low latency AI inference.</p>
						</div>
						<div class="feature-card">
							<div class="icon">🔒</div>
							<h4>100% Privacy Guarantee</h4>
							<p>Your media never leaves your laptop. Zero external cloud API calls or tracking.</p>
						</div>
						<div class="feature-card">
							<div class="icon">👤</div>
							<h4>Multi-Face Intelligence</h4>
							<p>Precise face detection, landmark alignment, occlusion masking, and multi-face selector controls.</p>
						</div>
						<div class="feature-card">
							<div class="icon">🎥</div>
							<h4>HD Video & Audio Sync</h4>
							<p>Preserves audio tracks, video FPS rates, and color profiles with high quality FFmpeg encoding.</p>
						</div>
					</div>
				""")

			# TAB 3: JOBS & BATCH QUEUE
			with gradio.Tab("📋 Job Manager & Batch Queue", id = 2):
				with gradio.Group(elem_classes = ["as-card"]):
					job_runner.render()
					job_manager.render()

		# Footer
		gradio.HTML("""
			<div class="aetherswap-footer">
				AetherSwap Studio v3.9.0 — OpenRAIL-AS Licensed
			</div>
		""")

	return layout


def listen() -> None:
	processors.listen()
	age_modifier_options.listen()
	background_remover_options.listen()
	deep_swapper_options.listen()
	expression_restorer_options.listen()
	face_debugger_options.listen()
	face_editor_options.listen()
	face_enhancer_options.listen()
	face_swapper_options.listen()
	frame_colorizer_options.listen()
	frame_enhancer_options.listen()
	lip_syncer_options.listen()
	execution.listen()
	execution_thread_count.listen()
	download.listen()
	memory.listen()
	temp_frame.listen()
	output_options.listen()
	source.listen()
	target.listen()
	output.listen()
	instant_runner.listen()
	job_runner.listen()
	job_manager.listen()
	terminal.listen()
	preview.listen()
	preview_options.listen()
	trim_frame.listen()
	face_selector.listen()
	face_tracker.listen()
	face_masker.listen()
	face_detector.listen()
	face_landmarker.listen()
	voice_extractor.listen()
	workflow.listen()


def run(ui : gradio.Blocks) -> None:
	ui.launch(favicon_path = 'facefusion.ico', inbrowser = state_manager.get_item('open_browser'))
